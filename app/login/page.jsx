"use client";

import { useState, useEffect } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find(row => row.startsWith("username="));
    if (userCookie) {
      setSavedName(userCookie.split("=")[1]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    document.cookie = `username=${name}; path=/; max-age=${7*24*60*60}`;
    setSavedName(name);
    setName("");
  };

  return (
    <div className="p-6">
      {!savedName ? (
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4">Enter Your Name</h1>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save Name
          </button>
        </form>
      ) : (
        <h1 className="text-2xl font-bold">Welcome back, {savedName}!</h1>
      )}
    </div>
  );
}
