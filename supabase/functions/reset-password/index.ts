import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    console.log("Reset password request for:", body.username, "method:", body.method);
    const { username, method, verification_value, new_password } = body;

    if (!username || !method || !new_password) {
      console.log("Missing required fields", { username: !!username, method: !!method, new_password: !!new_password });
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const email = `${username}@codechamps.local`;

    // Find the user by email - paginate through all users
    let authUser = null;
    let page = 1;
    const perPage = 100;
    while (!authUser) {
      const { data: listData } = await supabase.auth.admin.listUsers({ page, perPage });
      if (!listData?.users?.length) break;
      authUser = listData.users.find((u: any) => u.email === email) || null;
      if (listData.users.length < perPage) break;
      page++;
    }

    if (!authUser) {
      console.log("User not found for email:", email);
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Found user:", authUser.id);
    const userId = authUser.id;

    if (method === "old_password") {
      // Verify old password by attempting sign-in
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const anonClient = createClient(supabaseUrl, anonKey);
      const { error: signInError } = await anonClient.auth.signInWithPassword({ email, password: verification_value });
      if (signInError) {
        return new Response(JSON.stringify({ error: "Incorrect old password" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Sign out the temp session
      await anonClient.auth.signOut();
    } else if (method === "pin") {
      const { data: sec } = await supabase
        .from("user_security")
        .select("pin")
        .eq("user_id", userId)
        .maybeSingle();

      if (!sec || sec.pin !== verification_value) {
        return new Response(JSON.stringify({ error: "Incorrect PIN" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else if (method === "security_question") {
      const { data: sec } = await supabase
        .from("user_security")
        .select("security_answer")
        .eq("user_id", userId)
        .maybeSingle();

      if (!sec || sec.security_answer !== verification_value.trim().toLowerCase()) {
        return new Response(JSON.stringify({ error: "Incorrect security answer" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(JSON.stringify({ error: "Invalid method" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update password
    const { error: updateError } = await supabase.auth.admin.updateUser(userId, { password: new_password });
    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
