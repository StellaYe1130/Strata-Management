"use client";

import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(e.target),
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) {
        throw new Error(data.message || "Unable to submit request.");
      }

      setMessage(data.message || "Form submitted.");
      form.reset();
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[0.8fr_1.2fr]">
      <section>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          Contact management
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Maintenance Request
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          Send a maintenance request or general building enquiry. Include your unit
          number and enough detail for the committee or manager to follow up.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Name</span>
            <input
              name="name"
              placeholder="Your name"
              className="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
              required
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-semibold text-slate-700">Message</span>
          <textarea
            name="message"
            rows="7"
            placeholder="Describe the request..."
            className="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 rounded bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>

        {message ? <p className="mt-4 text-sm font-medium text-slate-700">{message}</p> : null}
      </form>
    </main>
  );
}
