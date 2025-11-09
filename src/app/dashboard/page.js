"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import ResumePreview from "./ResumePreview";
import { exportResumeAsPDF } from "./resumeUtils";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name || session?.user?.email || "Guest";

  const [layout, setLayout] = useState("single");
  const [atsScore, setAtsScore] = useState(95);
  const [resume, setResume] = useState({
    fullName: userName || "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    education: [{ id: Date.now() + 1, degree: "", inst: "", from: "", to: "" }],
    experience: [{ id: Date.now() + 11, role: "", company: "", duration: "", description: "" }],
    certifications: [{ id: Date.now() + 21, title: "", issuer: "", year: "" }],
  });

  const previewRef = useRef(null);

  useEffect(() => {
    if (session?.user?.name && (!resume.fullName || resume.fullName === "Guest")) {
      setResume((r) => ({ ...r, fullName: session.user.name }));
    }
  }, [session]);

  const updateField = (path, value) => {
    setResume((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const addItem = (section) => {
    setResume((prev) => {
      const copy = { ...prev };
      const newItem =
        section === "education"
          ? { id: Date.now(), degree: "", inst: "", from: "", to: "" }
          : section === "experience"
          ? { id: Date.now(), role: "", company: "", duration: "", description: "" }
          : { id: Date.now(), title: "", issuer: "", year: "" };
      copy[section] = [...copy[section], newItem];
      return copy;
    });
  };

  const removeItem = (section, id) => {
    setResume((prev) => ({ ...prev, [section]: prev[section].filter((i) => i.id !== id) }));
  };

  const handleDownload = async () => {
    try {
      await exportResumeAsPDF(previewRef.current, { fileName: `${resume.fullName || "resume"}.pdf`, layout });
    } catch (e) {
      console.error("Export failed", e);
      alert("PDF export failed. Please allow downloads.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-cyan-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              Welcome, <span className="text-cyan-400">{userName}</span>
            </h1>
            <p className="text-gray-300 mt-1">
              Build a <span className="text-cyan-300 font-medium">95% ATS-friendly</span> resume easily.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
            >
              <option value="single">Single column (White A4)</option>
              <option value="bi">Bi-column (Dark layout)</option>
            </select>

            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold shadow-lg transition"
            >
              Download PDF
            </button>
          </div>
        </header>

        {/* Main section */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Input form */}
          <section className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Enter your details</h2>

            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Full Name", key: "fullName" },
                { label: "Title", key: "title" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-sm text-gray-300">{label}</label>
                  <input
                    value={resume[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
                  />
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mb-4">
              <label className="text-sm text-gray-300">Professional Summary</label>
              <textarea
                value={resume.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                rows={4}
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="text-sm text-gray-300">Skills (comma-separated)</label>
              <input
                value={resume.skills}
                onChange={(e) => updateField("skills", e.target.value)}
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </div>

            {/* Dynamic Sections */}
            {["education", "experience", "certifications"].map((section) => (
              <div key={section} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-semibold text-cyan-300 capitalize">{section}</h3>
                  <button
                    onClick={() => addItem(section)}
                    className="text-sm bg-cyan-600 px-2 py-1 rounded text-white hover:bg-cyan-700"
                  >
                    + Add
                  </button>
                </div>

                <div className="space-y-3">
                  {resume[section].map((item, idx) => (
                    <div key={item.id} className="bg-gray-800 p-3 rounded border border-gray-700 space-y-2">
                      {Object.keys(item)
                        .filter((k) => k !== "id")
                        .map((key) => (
                          <input
                            key={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={item[key]}
                            onChange={(e) => updateField(`${section}.${idx}.${key}`, e.target.value)}
                            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 mb-1"
                          />
                        ))}
                      <button
                        onClick={() => removeItem(section, item.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* RIGHT: Live Preview */}
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <span className="text-sm text-gray-300">
                ATS Score: <span className="font-bold text-cyan-300">{atsScore}%</span>
              </span>
            </div>
            <div
              ref={previewRef}
              className={`${
                layout === "single" ? "bg-white text-black" : "bg-gray-900 text-white"
              } p-6 rounded-xl shadow-2xl border border-gray-300 overflow-auto h-[90vh]`}
            >
              <ResumePreview resume={resume} layout={layout} atsScore={atsScore} />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-8">
          Resume made with <span className="text-cyan-400 font-semibold">Abuzzz Resume Builder</span> — developed by{" "}
          <span className="text-white font-semibold">Mohammed Abu Baker</span>.
        </footer>
      </div>
    </div>
  );
}
