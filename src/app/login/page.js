"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { VantaBackground } from "@/components/VantaBackground";

// ✅ Inner component (Suspense-safe)
function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationSuccess = searchParams.get("success") === "true";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return setError("Please enter both email and password.");
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError("Invalid login credentials.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 p-8">
      <VantaBackground />

      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/85 backdrop-blur-md rounded-xl shadow-[0_0_40px_rgba(79,70,229,0.3)] border border-indigo-700/50 relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-cyan-400">
          Welcome Back
        </h2>

        {registrationSuccess && (
          <div className="bg-green-900/70 text-green-300 p-3 rounded-lg text-center border border-green-500">
            Account created successfully! Please sign in.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-white bg-gray-800 border-2 border-indigo-600/30 rounded-lg transition duration-200 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-white bg-gray-800 border-2 border-indigo-600/30 rounded-lg transition duration-200 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner"
              required
            />
          </div>

          {error && <p className="text-sm font-semibold text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-bold rounded-xl transition duration-300 shadow-lg neon-button ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-400">
          Need an account?{" "}
          <Link href="/register" className="font-medium text-cyan-400 hover:text-cyan-300 underline">
            Register Here
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .neon-button {
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
        }
        .neon-button:hover {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  );
}

// ✅ Export wrapped in Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-cyan-400 text-center mt-10">Loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
