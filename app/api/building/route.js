export const runtime = "edge";

export async function GET() {
  const BuildingIntro = {
    building: "123 Apartment, Sydney",
    committee: "Strata Management Department Committee",
    manager: {
      name: "Stella ye",
      phone: "0412345678",
      email: "Stella@123StrataManagement.com"
    }
  };
  return new Response(JSON.stringify(BuildingIntro), {
    headers: { "Content-Type": "application/json" }
  });
}
