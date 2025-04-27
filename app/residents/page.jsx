export default async function ResidentsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/residents`, { cache: "no-store" });
    const residents = await res.json();
  
    if (!res.ok) {
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
  