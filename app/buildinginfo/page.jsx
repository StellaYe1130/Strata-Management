"use client";

import { useEffect, useState } from "react";

export default function BuildingInfoPage() {
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    async function fetchBuilding() {
      try {
        const res = await fetch("/api/building", { cache: "no-store" }); 
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data);
        setBuilding(data[0]); 
      } catch (error) {
        console.error("Failed to fetch building data:", error);
      }
    }
  
    fetchBuilding();
  }, []);  

  if (!building) {
    return <div>Loading building data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Building Information</h1>
      <div className="border p-4 rounded-lg shadow">
        <p><strong>Building:</strong> {building.building}</p>
        <p><strong>Committee:</strong> {building.committee}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Manager Contact:</h2>
          <p><strong>Name:</strong> {building.manager_name}</p>
          <p><strong>Phone:</strong> {building.manager_phone}</p>
          <p><strong>Email:</strong> {building.manager_email}</p>
        </div>
      </div>
    </div>
  );
}
