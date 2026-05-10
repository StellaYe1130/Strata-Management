"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import supabase, { hasSupabaseConfig } from "@/lib/supabaseClient";

export default function ResidentsPage() {
  const [residents, setResidents] = useState([]);
  const [status, setStatus] = useState("checking-auth");
  const [errorMessage, setErrorMessage] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setStatus("error");
      setErrorMessage("Supabase is not configured.");
      return;
    }

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (!data.session) {
        setStatus("unauthenticated");
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setStatus("unauthenticated");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    async function fetchResidents() {
      try {
        setStatus("loading");
        const { data, error } = await supabase.from("Residents").select("*");

        if (error) {
          throw error;
        }

        setResidents(Array.isArray(data) ? data : []);
        setStatus("success");
      } catch (error) {
        setErrorMessage(error.message);
        setStatus("error");
      }
    }

    fetchResidents();
  }, [session]);

  if (!hasSupabaseConfig) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 text-red-600">
        Supabase is not configured.
      </main>
    );
  }

  if (status === "checking-auth") {
    return <main className="mx-auto max-w-6xl px-6 py-10">Checking access...</main>;
  }

  if (status === "unauthenticated") {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
            Protected route
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Resident login required
          </h1>
          <p className="mt-4 text-slate-700">
            Sign in before viewing resident records.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  if (status === "loading") {
    return <main className="mx-auto max-w-6xl px-6 py-10">Loading residents data...</main>;
  }

  if (status === "error") {
    return <main className="mx-auto max-w-6xl px-6 py-10 text-red-600">{errorMessage}</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
        Resident register
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">Residents List</h1>
      {residents.length === 0 ? (
        <p className="mt-6 text-slate-700">No residents found.</p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {residents.map((resident) => (
            <li
              key={resident.id || resident.email || resident.unit}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-lg font-bold text-slate-950">{resident.name}</p>
              <p className="mt-3 text-sm text-slate-700">
                <strong>Name:</strong> {resident.name}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Unit:</strong> {resident.unit}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Email:</strong> {resident.email}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Phone:</strong> {resident.phone}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
