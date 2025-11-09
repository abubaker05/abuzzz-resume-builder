"use client";

import { useState } from "react";

export default function FormPage() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    // Store to DB (MongoDB via API route)
    try {
      const res = await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User saved:", data);
        // Redirect to builder page
        window.location.href = "/builder";
      } else {
        alert("Error saving user");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Enter Your Name</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-80"
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg text-black"
        />
        <button
          type="submit"
          className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
