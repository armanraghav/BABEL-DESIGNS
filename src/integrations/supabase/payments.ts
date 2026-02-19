import { getSupabaseClient } from "./client";

export interface RazorpayOrderRequest {
  localOrderId: string;
}

export interface RazorpayOrderResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
}

export interface RazorpayVerifyRequest {
  localOrderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface MarkPaymentFailedRequest {
  localOrderId: string;
  reason: string;
}

export const createRazorpayOrder = async (input: RazorpayOrderRequest): Promise<RazorpayOrderResponse> => {
  const { data, error } = await getSupabaseClient().functions.invoke("create-razorpay-order", {
    body: input,
  });

  if (error) throw error;
  return data as RazorpayOrderResponse;
};

export const verifyRazorpayPayment = async (input: RazorpayVerifyRequest): Promise<{ success: boolean }> => {
  const { data, error } = await getSupabaseClient().functions.invoke("verify-razorpay-payment", {
    body: input,
  });

  if (error) throw error;
  return data as { success: boolean };
};

export const markPaymentFailed = async (input: MarkPaymentFailedRequest): Promise<{ success: boolean }> => {
  const { data, error } = await getSupabaseClient().functions.invoke("mark-order-payment-failed", {
    body: input,
  });

  if (error) throw error;
  return data as { success: boolean };
};
