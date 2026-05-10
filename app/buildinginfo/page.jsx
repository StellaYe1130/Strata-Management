"use client";

import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function BuildingInfoPage() {
  const [building, setBuilding] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchBuilding() {
      try {
        const res = await fetch("/api/building", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load building data.");
        }

        if (Array.isArray(data) && data.length > 0) {
          setBuilding(data[0]);
          setStatus("success");
        } else {
          setBuilding(null);
          setStatus("empty");
        }
      } catch (error) {
        setErrorMessage(error.message);
        setStatus("error");
      }
    }

    fetchBuilding();
    if (!supabase) {
      return undefined;
    }

    const channel = supabase
      .channel("building-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "building",
        },
        () => {
          fetchBuilding();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (status === "loading") {
    return <main className="mx-auto max-w-6xl px-6 py-10">Loading building data...</main>;
  }

  if (status === "error") {
    return <main className="mx-auto max-w-6xl px-6 py-10 text-red-600">{errorMessage}</main>;
  }

  if (status === "empty" || !building) {
    return <main className="mx-auto max-w-6xl px-6 py-10">No building information found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
        Building register
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Building Information
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Property</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-500">Building</dt>
              <dd className="mt-1 text-slate-950">{building.building}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Committee</dt>
              <dd className="mt-1 text-slate-950">{building.committee}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Manager Contact</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-500">Name</dt>
              <dd className="mt-1 text-slate-950">{building.manager_name}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Phone</dt>
              <dd className="mt-1 text-slate-950">{building.manager_phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Email</dt>
              <dd className="mt-1 text-slate-950">{building.manager_email}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
