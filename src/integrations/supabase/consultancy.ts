import { getSupabaseClient } from "./client";

export interface ConsultancyRequestInput {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  timeline?: string;
  message?: string;
}

export const createConsultancyRequest = async (input: ConsultancyRequestInput) => {
  const { error } = await getSupabaseClient().from("consultancy_requests").insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    project_type: input.projectType || null,
    timeline: input.timeline || null,
    message: input.message || null,
  });

  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") {
      throw new Error("Supabase table missing: public.consultancy_requests. Run supabase/schema.sql in SQL Editor.");
    }
    throw error;
  }
};
