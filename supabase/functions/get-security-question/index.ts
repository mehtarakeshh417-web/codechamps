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

    const { username } = await req.json();
    if (!username) {
      return jsonResponse({ error: "Missing username" });
    }

    const email = `${username}@codechamps.local`;

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
      return jsonResponse({ error: "User not found" });
    }

    const { data: sec } = await supabase
      .from("user_security")
      .select("security_question")
      .eq("user_id", authUser.id)
      .maybeSingle();

    return jsonResponse({
      has_security: !!sec,
      security_question: sec?.security_question || null,
    });
  } catch (err) {
    console.error("Error:", err.message);
    return jsonResponse({ error: err.message });
  }
});
