import { jsonResponse } from "@/lib/supabaseServer";

export async function GET() {
  return jsonResponse(
    {
      error:
        "Residents are protected. Sign in and read the Residents table through Supabase Auth.",
    },
    401
  );
}
