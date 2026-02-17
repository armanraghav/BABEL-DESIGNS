import { getSupabaseClient } from "./client";

export interface StudioDispatchSubscriptionInput {
  email: string;
}

export const createStudioDispatchSubscription = async (input: StudioDispatchSubscriptionInput) => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("studio_dispatch_subscribers")
    .insert({
      email: input.email,
    });

  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") {
      const { error: fallbackError } = await supabase.from("consultancy_requests").insert({
        name: "Studio Dispatch Subscriber",
        email: input.email,
        project_type: "studio_dispatch",
      });

      if (!fallbackError) {
        return;
      }

      throw new Error("Subscription storage is not ready yet. Please run supabase/schema.sql in SQL Editor.");
    }
    if (error.code === "23505") {
      // Unique violation: already subscribed.
      return;
    }
    throw error;
  }
};
