"use client";

import { useEffect, useState } from "react";

export default function MaintenanceInfoPage() {
  const [maintenance, setMaintenance] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchMaintenance() {
      try {
        const res = await fetch("/api/maintenance", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load maintenance data.");
        }

        if (Array.isArray(data) && data.length > 0) {
          setMaintenance(data[0]);
          setStatus("success");
        } else {
          setStatus("empty");
        }
      } catch (error) {
        setErrorMessage(error.message);
        setStatus("error");
      }
    }
    fetchMaintenance();
  }, []);

  if (status === "loading") {
    return <main className="mx-auto max-w-6xl px-6 py-10">Loading maintenance data...</main>;
  }

  if (status === "error") {
    return <main className="mx-auto max-w-6xl px-6 py-10 text-red-600">{errorMessage}</main>;
  }

  if (status === "empty" || !maintenance) {
    return <main className="mx-auto max-w-6xl px-6 py-10">No maintenance information found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
        Maintenance support
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Maintenance Information
      </h1>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="grid gap-5 text-sm md:grid-cols-3">
          {[
            ["Company", maintenance.company],
            ["Time", maintenance.time],
            ["Number", maintenance.number],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-semibold text-slate-500">{label}</dt>
              <dd className="mt-1 text-slate-950">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
