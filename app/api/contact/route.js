import { createSupabaseServerClient, jsonResponse } from "@/lib/supabaseServer";

export async function POST(request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return jsonResponse({ message: "Name, email, and message are required." }, 400);
  }

  const { client: supabase, error: configError } = createSupabaseServerClient();

  if (configError) {
    return jsonResponse({ message: configError }, 500);
  }

  const { error } = await supabase.from("contact_requests").insert({
    name,
    email,
    message,
    status: "new",
  });

  if (error) {
    return jsonResponse({ message: error.message }, 500);
  }

  return jsonResponse({
    message: "Request submitted successfully.",
  });
}

export async function GET() {
  return jsonResponse({
    message: "Submit contact requests using POST.",
  });
}
