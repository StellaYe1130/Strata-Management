"use client";

import { useEffect, useState } from "react";

export default function InsuranceInfoPage() {
  const [insurance, setInsurance] = useState(null);

  useEffect(() => {
    async function fetchInsurance() {
      const res = await fetch("/api/insurance");
      const data = await res.json();
      setInsurance(data);
    }
    fetchInsurance();
  }, []);

  if (!insurance) {
    return <div>Loading insurance data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Insurance Information</h1>
      <div className="border p-4 rounded-lg shadow">
        <p><strong>Company:</strong> {insurance.Company}</p>
        <p><strong>Period:</strong> {insurance.Period}</p>
        <p><strong>Amount:</strong> {insurance.Amount}</p>
        <p><strong>Deadline:</strong> {insurance.Deadline}</p>
        <p><strong>Contact:</strong> {insurance.Contact}</p>
      </div>
    </div>
  );
}
