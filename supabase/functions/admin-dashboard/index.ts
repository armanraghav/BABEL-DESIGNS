import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
};

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const adminToken = request.headers.get("x-admin-token");
    const expectedToken = Deno.env.get("ADMIN_DASHBOARD_TOKEN");
    if (!adminToken || !expectedToken || adminToken !== expectedToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Missing Supabase environment." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const [
      { data: orders = [] },
      { data: consultancyRequests = [] },
      { data: subscribers = [] },
      { data: collections = [] },
      { data: products = [] },
    ] = await Promise.all([
      supabase
        .from("orders")
        .select("id,status,payment_status,total_amount,currency,created_at")
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("consultancy_requests")
        .select("id,name,email,project_type,created_at")
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("studio_dispatch_subscribers")
        .select("id,email,created_at")
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("collections")
        .select("id,slug,name,tagline,description,hero_image_url")
        .order("sort_order", { ascending: true }),
      supabase
        .from("products")
        .select("id,slug,name,active,image_url")
        .order("sort_order", { ascending: true }),
    ]);

    const metrics = {
      orders: orders.length,
      paidOrders: orders.filter((order) => order.payment_status === "paid").length,
      consultancyRequests: consultancyRequests.length,
      subscribers: subscribers.length,
    };

    return new Response(
      JSON.stringify({
        metrics,
        orders,
        consultancyRequests,
        subscribers,
        collections,
        products,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("admin-dashboard error", error);
    return new Response(JSON.stringify({ error: "Failed to load dashboard." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
