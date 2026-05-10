"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

const quickActions = [
  {
    href: "/buildinginfo",
    title: "Building details",
    description: "Committee and manager contact information.",
  },
  {
    href: "/insuranceinfo",
    title: "Insurance register",
    description: "Policy period, cover amount, deadline, and contact.",
  },
  {
    href: "/maintenanceinfo",
    title: "Maintenance support",
    description: "Current provider details for resident requests.",
  },
];

export default function Home() {
  const [sessionEmail, setSessionEmail] = useState("");

  useEffect(() => {
    if (!supabase) {
      return;
    }

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSessionEmail(data.session?.user?.email || "");
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user?.email || "");
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setSessionEmail("");
  }

  return (
    <main className="bg-slate-50">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          {sessionEmail ? (
            <div className="mb-6 flex flex-wrap items-center gap-3 rounded border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
              <p className="font-semibold text-slate-800">
                Signed in as {sessionEmail}.
              </p>
              <button
                onClick={handleLogout}
                className="rounded border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          ) : null}

          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-700">
            Resident and committee portal
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Practical strata information for 123 Apartment
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            View current building records, insurance details, maintenance contacts,
            resident information, and committee resources from one calm, simple place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/buildinginfo"
              className="rounded bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              View Building Info
            </Link>
            <Link
              href="/contact"
              className="rounded border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Submit Request
            </Link>
          </div>
        </div>

        <Image
          src="/Building_pic.png"
          alt="123 Apartment building"
          width={720}
          height={520}
          priority
          className="h-auto w-full rounded-lg border border-slate-200 object-cover shadow-sm"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 hover:shadow"
            >
              <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
              Committee resource
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Governance information
            </h2>
          </div>
          <div>
            <p className="leading-7 text-slate-700">
              The strata committee represents owners and supports day-to-day
              decisions for the building. Committee information is available as a
              PDF for residents and stakeholders.
            </p>
            <Link
              href="/Committee.pdf"
              target="_blank"
              className="mt-4 inline-flex text-sm font-bold text-blue-700 underline"
            >
              Open Committee Information PDF
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
