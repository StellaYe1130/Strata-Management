import {
  createSupabaseServerClient,
  jsonResponse,
} from "@/lib/supabaseServer";

export async function GET() {
  const { client: supabase, error: configError } =
    createSupabaseServerClient();

  if (configError) {
    return jsonResponse({ error: configError }, 500);
  }

  const { data, error } = await supabase.from("Insurance").select("*");

  if (error) {
    return jsonResponse({ error: error.message }, 500);
  }

  return jsonResponse(data);
}
