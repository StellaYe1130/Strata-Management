"use client";

import { useEffect, useState } from "react";

export default function MaintenanceInfoPage() {
  const [maintenance, setMaintenance] = useState(null);

  useEffect(() => {
    async function fetchMaintenance() {
      const res = await fetch("/api/maintenance");
      const data = await res.json();
      setMaintenance(data);
    }
    fetchMaintenance();
  }, []);

  if (!maintenance) {
    return <div>Loading maintenance data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance Information</h1>
      <div className="border p-4 rounded-lg shadow">
        <p><strong>Company:</strong> {maintenance.Company}</p>
        <p><strong>Time:</strong> {maintenance.Time}</p>
        <p><strong>Number:</strong> {maintenance.Number}</p>
      </div>
    </div>
  );
}
