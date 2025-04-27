export const runtime = "edge";

export async function GET() {
  const Insurance = {
    Company: "999 Insurance Pty Ltd",
    Period: "1 Jan 2025 - 30 Dec 2025",
    Amount: "$2000",
    Deadline: "By 30 May 2025",
    Contact: "999@insurance.com"
  };
  return new Response(JSON.stringify(Insurance), {
    headers: { "Content-Type": "application/json" }
  });
}
