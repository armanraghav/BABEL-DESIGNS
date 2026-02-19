import type { CartItem } from "@/context/CartContext";
import { getSupabaseClient } from "./client";

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    typeof item.image === "string" &&
    typeof item.quantity === "number"
  );
};

const normalizeCartItems = (value: unknown): CartItem[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter(isCartItem)
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Math.floor(item.quantity)),
    }));
};

const isMissingTableError = (error: { code?: string; message?: string } | null) =>
  Boolean(
    error &&
      (error.code === "PGRST205" ||
        error.code === "42P01" ||
        error.message?.includes("schema cache") ||
        error.message?.includes("does not exist")),
  );

export const fetchUserCartItems = async (userId: string): Promise<CartItem[]> => {
  const { data, error } = await getSupabaseClient()
    .from("user_carts")
    .select("items")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return [];
    throw error;
  }

  return normalizeCartItems(data?.items ?? []);
};

export const saveUserCartItems = async (userId: string, items: CartItem[]) => {
  const sanitized = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: Math.max(1, Math.floor(item.quantity)),
    material: item.material ?? undefined,
  }));

  const payload = {
    user_id: userId,
    items: sanitized,
    updated_at: new Date().toISOString(),
  };

  const { error } = await getSupabaseClient().from("user_carts").upsert(payload, {
    onConflict: "user_id",
  });

  if (error) {
    if (isMissingTableError(error)) return;
    throw error;
  }
};
