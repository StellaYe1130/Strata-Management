"use client";

import { useEffect, useState } from "react";

export default function InsuranceInfoPage() {
  const [insurance, setInsurance] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchInsurance() {
      try {
        const res = await fetch("/api/insurance", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load insurance data.");
        }

        if (Array.isArray(data) && data.length > 0) {
          setInsurance(data[0]);
          setStatus("success");
        } else {
          setStatus("empty");
        }
      } catch (error) {
        setErrorMessage(error.message);
        setStatus("error");
      }
    }
    fetchInsurance();
  }, []);

  if (status === "loading") {
    return <main className="mx-auto max-w-6xl px-6 py-10">Loading insurance data...</main>;
  }

  if (status === "error") {
    return <main className="mx-auto max-w-6xl px-6 py-10 text-red-600">{errorMessage}</main>;
  }

  if (status === "empty" || !insurance) {
    return <main className="mx-auto max-w-6xl px-6 py-10">No insurance information found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
        Insurance register
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Insurance Information
      </h1>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="grid gap-5 text-sm md:grid-cols-2">
          {[
            ["Company", insurance.company],
            ["Period", insurance.period],
            ["Amount", insurance.amount],
            ["Deadline", insurance.deadline],
            ["Contact", insurance.contact],
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
