"use client";

import { useEffect, useState } from "react";

export default function InsuranceInfoPage() {
  const [insurance, setInsurance] = useState(null);

  useEffect(() => {
    async function fetchInsurance() {
      const res = await fetch("/api/insurance");
      const data = await res.json();
      setInsurance(data[0]); 
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
        <p><strong>Company:</strong> {insurance.company}</p>
        <p><strong>Period:</strong> {insurance.period}</p>
        <p><strong>Amount:</strong> {insurance.amount}</p>
        <p><strong>Deadline:</strong> {insurance.deadline}</p>
        <p><strong>Contact:</strong> {insurance.contact}</p>
      </div>
    </div>
  );
}
