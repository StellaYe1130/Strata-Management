export const runtime = "edge";

export async function GET() {
  const Maintain = {
    Company: "ABC Repair Pty Ltd",
    Time: "24/7",
    Number: "0411111111"
  };
  return new Response(JSON.stringify(Maintain), {
    headers: { "Content-Type": "application/json" }
  });
}
