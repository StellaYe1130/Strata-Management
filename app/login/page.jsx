"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import supabase, { hasSupabaseConfig } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [mode, setMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured.");
      }

      const authRequest =
        mode === "sign-up"
          ? supabase.auth.signUp({ email, password })
          : supabase.auth.signInWithPassword({ email, password });

      const { error } = await authRequest;

      if (error) {
        throw error;
      }

      setMessage(
        mode === "sign-up"
          ? "Account created. Check your email if confirmation is enabled."
          : "Signed in successfully."
      );
      setPassword("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setMessage("Signed out.");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Supabase Auth
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Resident Login
        </h1>

        {!hasSupabaseConfig ? (
          <p className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Supabase environment variables are missing.
          </p>
        ) : null}

        {sessionEmail ? (
          <div className="mt-6">
            <p className="text-slate-700">
              You are signed in as <strong>{sessionEmail}</strong>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="rounded bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Open Admin
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex rounded border border-slate-300 p-1 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setMode("sign-in")}
                className={`flex-1 rounded px-3 py-2 ${
                  mode === "sign-in" ? "bg-slate-950 text-white" : "text-slate-700"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("sign-up")}
                className={`flex-1 rounded px-3 py-2 ${
                  mode === "sign-up" ? "bg-slate-950 text-white" : "text-slate-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
                minLength="6"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading || !hasSupabaseConfig}
              className="rounded bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Please wait..." : mode === "sign-up" ? "Create Account" : "Sign In"}
            </button>
          </form>
        )}

        {message ? <p className="mt-5 text-sm font-medium text-slate-700">{message}</p> : null}
      </div>
    </main>
  );
}
