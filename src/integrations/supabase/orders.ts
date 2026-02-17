import type { CartItem } from "@/context/CartContext";
import { getSupabaseClient } from "./client";

export interface CreateOrderInput {
  fullName?: string;
  email?: string;
  notes?: string;
  items: CartItem[];
  currency?: string;
}

export interface CreatedOrder {
  id: string;
  totalAmount: number;
  currency: string;
}

export const createOrder = async (input: CreateOrderInput): Promise<CreatedOrder> => {
  const supabase = getSupabaseClient();

  const totalAmount = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currency = input.currency ?? "INR";

  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
      full_name: input.fullName ?? null,
      email: input.email ?? null,
      notes: input.notes ?? null,
      total_amount: totalAmount,
      currency,
      status: "created",
      payment_provider: "razorpay",
      payment_status: "created",
    })
    .select("id")
    .single();

  if (orderError) throw orderError;

  const orderItems = input.items.map((item) => ({
    order_id: orderRow.id,
    product_id: item.id,
    product_name: item.name,
    unit_price: item.price,
    quantity: item.quantity,
    material: item.material ?? null,
    image_url: item.image,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) throw itemsError;

  return {
    id: orderRow.id,
    totalAmount,
    currency,
  };
};
