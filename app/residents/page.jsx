import { supabase } from "@/lib/supabaseClient";

export default async function ResidentsPage() {
  const { data: residents, error } = await supabase
    .from("Residents")
    .select("*");

  if (error) {
    console.error("Error fetching residents:", error.message);
    return <div className="p-6 text-red-500">Failed to load residents data.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Residents List</h1>
      <ul className="space-y-4">
        {residents.map((resident) => (
          <li key={resident.id} className="border p-4 rounded-lg shadow">
            <p><strong>Name:</strong> {resident.name}</p>
            <p><strong>Unit:</strong> {resident.unit}</p>
            <p><strong>Email:</strong> {resident.email}</p>
            <p><strong>Phone:</strong> {resident.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
