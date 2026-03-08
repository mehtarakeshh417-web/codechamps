import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const jsonResponse = (body: object) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { username, method, verification_value, new_password } = await req.json();
    console.log("Reset request for:", username, "method:", method);

    if (!username || !method || !new_password) {
      return jsonResponse({ error: "Missing required fields" });
    }

    const email = `${username}@codechamps.local`;

    // Find user by email with pagination
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
      console.log("User not found:", email);
      return jsonResponse({ error: "User not found" });
    }

    const userId = authUser.id;
    console.log("Found user:", userId);

    if (method === "old_password") {
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const anonClient = createClient(supabaseUrl, anonKey);
      const { error: signInError } = await anonClient.auth.signInWithPassword({ email, password: verification_value });
      if (signInError) {
        console.log("Old password verification failed:", signInError.message);
        return jsonResponse({ error: "Incorrect old password" });
      }
      await anonClient.auth.signOut();
    } else if (method === "pin") {
      const { data: sec, error: secError } = await supabase
        .from("user_security")
        .select("pin")
        .eq("user_id", userId)
        .maybeSingle();

      console.log("PIN lookup:", { found: !!sec, error: secError?.message });
      if (!sec || sec.pin !== verification_value) {
        return jsonResponse({ error: "Incorrect PIN" });
      }
    } else if (method === "security_question") {
      const { data: sec, error: secError } = await supabase
        .from("user_security")
        .select("security_answer")
        .eq("user_id", userId)
        .maybeSingle();

      console.log("Security Q lookup:", { found: !!sec, error: secError?.message });
      if (!sec || sec.security_answer !== verification_value.trim().toLowerCase()) {
        return jsonResponse({ error: "Incorrect security answer" });
      }
    } else {
      return jsonResponse({ error: "Invalid method" });
    }

    // Update password - no restrictions
    const { error: updateError } = await supabase.auth.admin.updateUser(userId, { password: new_password });
    if (updateError) {
      console.log("Password update failed:", updateError.message);
      return jsonResponse({ error: "Password update failed: " + updateError.message });
    }

    console.log("Password reset successful for:", username);
    return jsonResponse({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return jsonResponse({ error: err.message });
  }
});
