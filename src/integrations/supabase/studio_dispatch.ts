import { getSupabaseClient } from "./client";

export interface StudioDispatchSubscriptionInput {
  email: string;
}

export const createStudioDispatchSubscription = async (input: StudioDispatchSubscriptionInput) => {
  const { error } = await getSupabaseClient()
    .from("studio_dispatch_subscribers")
    .insert({
      email: input.email,
    });

  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") {
      throw new Error(
        "Supabase table missing: public.studio_dispatch_subscribers. Run supabase/schema.sql in SQL Editor."
      );
    }
    if (error.code === "23505") {
      // Unique violation: already subscribed.
      return;
    }
    throw error;
  }
};

