import Razorpay from "npm:razorpay@2.9.6";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateRazorpayOrderRequest {
  localOrderId: string;
}

const toSubunits = (amount: number) => Math.round(amount * 100);

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    if (!razorpayKeyId || !razorpayKeySecret) {
      return new Response(JSON.stringify({ error: "Missing Razorpay secrets." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await request.json()) as CreateRazorpayOrderRequest;
    const localOrderId = body.localOrderId?.trim();

    if (!localOrderId) {
      return new Response(JSON.stringify({ error: "localOrderId is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id,total_amount,currency,razorpay_order_id,payment_status")
      .eq("id", localOrderId)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Order not found." }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const amount = toSubunits(Number(order.total_amount));
    const currency = order.currency ?? "INR";

    if (order.razorpay_order_id && order.payment_status !== "paid") {
      const existingOrder = await razorpay.orders.fetch(order.razorpay_order_id);
      return new Response(
        JSON.stringify({
          razorpayOrderId: existingOrder.id,
          amount: existingOrder.amount,
          currency: existingOrder.currency,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency,
      receipt: localOrderId.slice(0, 40),
      notes: {
        local_order_id: localOrderId,
      },
    });

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_provider: "razorpay",
        payment_status: "pending",
        razorpay_order_id: razorpayOrder.id,
        status: "payment_pending",
      })
      .eq("id", localOrderId);

    if (updateError) {
      return new Response(JSON.stringify({ error: "Failed to update order." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("create-razorpay-order error", error);
    return new Response(JSON.stringify({ error: "Failed to create Razorpay order." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
