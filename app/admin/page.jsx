"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import supabase, { hasSupabaseConfig } from "@/lib/supabaseClient";

const resources = {
  residents: {
    label: "Residents",
    table: "Residents",
    fields: ["name", "unit", "email", "phone"],
    empty: { name: "", unit: "", email: "", phone: "" },
  },
  insurance: {
    label: "Insurance",
    table: "Insurance",
    fields: ["company", "period", "amount", "deadline", "contact"],
    empty: { company: "", period: "", amount: "", deadline: "", contact: "" },
  },
  maintenance: {
    label: "Maintenance",
    table: "Maintenance",
    fields: ["company", "time", "number"],
    empty: { company: "", time: "", number: "" },
  },
  requests: {
    label: "Contact Requests",
    table: "contact_requests",
    fields: ["name", "email", "message", "status"],
    empty: { name: "", email: "", message: "", status: "new" },
  },
};

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeKey, setActiveKey] = useState("residents");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(resources.residents.empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const activeResource = resources[activeKey];

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bTime - aTime;
    });
  }, [rows]);

  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      return;
    }

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        await checkAdmin(data.session.user.id);
      }
      setCheckingAuth(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        checkAdmin(nextSession.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdmin(userId) {
    const { data, error } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    setIsAdmin(Boolean(data && !error));
  }

  useEffect(() => {
    setForm(activeResource.empty);
    setEditingId(null);

    if (session && isAdmin) {
      loadRows(activeResource);
    }
  }, [activeKey, session, isAdmin]);

  async function loadRows(resource = activeResource) {
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from(resource.table)
        .select("*")
        .limit(100);

      if (error) {
        throw error;
      }

      setRows(data || []);
    } catch (error) {
      setMessage(error.message);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startEdit(row) {
    const nextForm = {};
    activeResource.fields.forEach((field) => {
      nextForm[field] = row[field] || "";
    });
    setForm(nextForm);
    setEditingId(row.id);
    setMessage("");
  }

  function resetForm() {
    setForm(activeResource.empty);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const request = editingId
        ? supabase.from(activeResource.table).update(form).eq("id", editingId)
        : supabase.from(activeResource.table).insert(form);

      const { error } = await request;

      if (error) {
        throw error;
      }

      setMessage(editingId ? "Record updated." : "Record created.");
      resetForm();
      await loadRows();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteRow(id) {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from(activeResource.table).delete().eq("id", id);

      if (error) {
        throw error;
      }

      setMessage("Record deleted.");
      await loadRows();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  if (!hasSupabaseConfig) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          Supabase is not configured. Add the environment variables first.
        </p>
      </main>
    );
  }

  if (checkingAuth) {
    return <main className="mx-auto max-w-6xl px-6 py-12">Checking access...</main>;
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
            Protected route
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Admin access required
          </h1>
          <p className="mt-4 text-slate-700">
            Sign in with Supabase Auth to manage building records and contact requests.
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

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
            Admin allowlist
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            You are signed in, but not an admin
          </h1>
          <p className="mt-4 text-slate-700">
            Add this user id to the Supabase <code>admin_users</code> table to
            enable dashboard access.
          </p>
          <pre className="mt-4 overflow-auto rounded bg-slate-100 p-4 text-sm text-slate-800">
            {session.user.id}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
            Protected admin
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Management Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Signed in as {session.user.email}
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
        >
          Sign Out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {Object.entries(resources).map(([key, resource]) => (
          <button
            key={key}
            onClick={() => setActiveKey(key)}
            className={`rounded px-4 py-2 text-sm font-semibold ${
              activeKey === key
                ? "bg-slate-950 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {resource.label}
          </button>
        ))}
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-950">
            {editingId ? "Edit record" : "Create record"}
          </h2>

          <div className="mt-5 space-y-4">
            {activeResource.fields.map((field) => (
              <label key={field} className="block">
                <span className="text-sm font-semibold capitalize text-slate-700">
                  {field.replace("_", " ")}
                </span>
                {field === "message" ? (
                  <textarea
                    value={form[field] || ""}
                    onChange={(e) => updateField(field, e.target.value)}
                    rows="5"
                    className="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
                    required
                  />
                ) : (
                  <input
                    value={form[field] || ""}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
                    required={field !== "status"}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:bg-slate-400"
            >
              {editingId ? "Save Changes" : "Create"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-100"
              >
                Cancel
              </button>
            ) : null}
          </div>

          {message ? <p className="mt-4 text-sm font-medium text-slate-700">{message}</p> : null}
        </form>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-950">{activeResource.label}</h2>
            <button
              onClick={() => loadRows()}
              className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
            >
              Refresh
            </button>
          </div>

          {loading ? <p className="mt-5 text-slate-600">Loading...</p> : null}

          <div className="mt-5 space-y-4">
            {sortedRows.length === 0 && !loading ? (
              <p className="text-slate-600">No records found.</p>
            ) : null}

            {sortedRows.map((row) => (
              <article key={row.id} className="rounded border border-slate-200 p-4">
                <dl className="grid gap-3 text-sm md:grid-cols-2">
                  {activeResource.fields.map((field) => (
                    <div key={field} className={field === "message" ? "md:col-span-2" : ""}>
                      <dt className="font-semibold capitalize text-slate-500">
                        {field.replace("_", " ")}
                      </dt>
                      <dd className="mt-1 whitespace-pre-wrap text-slate-950">
                        {row[field] || "-"}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => startEdit(row)}
                    className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="rounded border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
