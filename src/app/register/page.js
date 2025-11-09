"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VantaBackground } from "@/components/VantaBackground";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      router.push("/login?success=true");
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#030712]">
      <VantaBackground />
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-[2px] z-[1]" />

      <div className="relative z-10 w-full max-w-lg p-10 bg-gray-900/90 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.4)] border border-cyan-400/30">
        <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-white bg-gray-800 border-2 border-cyan-600/50 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 shadow-inner"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-white bg-gray-800 border-2 border-cyan-600/50 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 shadow-inner"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-white bg-gray-800 border-2 border-cyan-600/50 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 shadow-inner"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 text-white bg-gray-800 border-2 border-cyan-600/50 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 shadow-inner"
              required
            />
          </div>

          {error && (
            <p className="text-sm font-semibold text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-bold rounded-xl transition duration-300 shadow-lg ${
              loading
                ? "bg-cyan-400 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700 text-white"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-400 mt-4">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-cyan-400 hover:text-cyan-300 underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
