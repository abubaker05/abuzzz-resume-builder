"use client";

import React from "react";

/**
 * ResumePreview
 * - layout: "single" (white) or "bi" (dark)
 */
export default function ResumePreview({ resume, layout = "single", atsScore = 90 }) {
  const isBi = layout === "bi";

  const SkillChips = ({ skills }) => {
    return (
      <div className="flex flex-wrap gap-2">
        {(skills || "").split(",").map((s, i) => s.trim() ? (
          <span key={i} className={`text-xs px-3 py-1 rounded-full ${isBi ? "bg-cyan-900 text-cyan-200" : "bg-gray-200 text-gray-800"}`}>{s.trim()}</span>
        ) : null)}
      </div>
    );
  };

  return (
    <div className={`${isBi ? "bg-gray-900 text-white border border-cyan-700" : "bg-white text-black border border-gray-200"} max-w-3xl mx-auto shadow-xl rounded-lg p-6 print:p-0 print:shadow-none`} style={{ minHeight: 820 }}>
      {/* Top row: Name + ATS */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className={`text-2xl font-extrabold ${isBi ? "text-white" : "text-black"}`}>{resume.fullName || "Full Name"}</h1>
          <p className={`mt-1 ${isBi ? "text-cyan-300" : "text-gray-700"}`}>{resume.title || "Professional Title"}</p>
        </div>

        {/* ATS score only displayed in dark preview (as requested) */}
        {isBi ? (
          <div className="text-right">
            <div className="text-sm text-gray-300">ATS Score</div>
            <div className="text-2xl font-bold text-cyan-300">{atsScore}%</div>
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT (for bi layout: sidebar) */}
        <aside className={`${isBi ? "md:col-span-1" : "md:col-span-1"}`}>
          {/* Contact */}
          <div className={`${isBi ? "bg-gray-800 p-3 rounded" : ""}`}>
            <h4 className={`font-semibold ${isBi ? "text-cyan-200" : "text-gray-700"}`}>Contact</h4>
            <div className={`${isBi ? "text-gray-300" : "text-gray-700"} text-sm mt-1`}>
              {resume.email && <div>Email: {resume.email}</div>}
              {resume.phone && <div>Phone: {resume.phone}</div>}
            </div>
          </div>

          <div className={`mt-4 ${isBi ? "bg-gray-800 p-3 rounded" : ""}`}>
            <h4 className={`font-semibold ${isBi ? "text-cyan-200" : "text-gray-700"}`}>Skills</h4>
            <div className="mt-2"><SkillChips skills={resume.skills} /></div>
          </div>

          {resume.certifications?.length ? (
            <div className={`mt-4 ${isBi ? "bg-gray-800 p-3 rounded" : ""}`}>
              <h4 className={`font-semibold ${isBi ? "text-cyan-200" : "text-gray-700"}`}>Certifications</h4>
              <ul className={`${isBi ? "text-gray-300" : "text-gray-700"} mt-2 text-sm space-y-1`}>
                {resume.certifications.map((c, idx) => c.title ? <li key={c.id || idx}>{c.title} {c.issuer ? `— ${c.issuer}` : ""} {c.year ? `(${c.year})` : ""}</li> : null)}
              </ul>
            </div>
          ) : null}
        </aside>

        {/* RIGHT: Main content */}
        <div className={`${isBi ? "md:col-span-2" : "md:col-span-2"}`}>
          <section className={`${isBi ? "bg-transparent" : ""}`}>
            <h3 className={`font-semibold ${isBi ? "text-cyan-200" : "text-gray-800"}`}>Summary</h3>
            <p className={`${isBi ? "text-gray-300" : "text-gray-700"} mt-2`}>{resume.summary || "Brief summary about your experience, strengths and accomplishments."}</p>
          </section>

          <section className="mt-4">
            <h3 className={`font-semibold ${isBi ? "text-cyan-200" : "text-gray-800"}`}>Experience</h3>
            <div className="mt-2 space-y-3">
              {resume.experience?.map((e) => e.role ? (
                <div key={e.id} className={`${isBi ? "bg-gray-800 p-3 rounded" : ""}`}>
                  <div className={`flex justify-between ${isBi ? "text-white" : "text-gray-800"}`}>
                    <div className="font-semibold">{e.role} · <span className="font-medium text-sm">{e.company}</span></div>
                    <div className="text-sm text-gray-400">{e.duration}</div>
                  </div>
                  <p className={`mt-1 ${isBi ? "text-gray-300" : "text-gray-700"} text-sm`}>{e.description}</p>
                </div>
              ) : null)}
            </div>
          </section>

          <section className="mt-4">
            <h3 className={`font-semibold ${isBi ? "text-cyan-200" : "text-gray-800"}`}>Education</h3>
            <div className="mt-2 space-y-2 text-sm">
              {resume.education?.map((ed) => ed.degree ? (
                <div key={ed.id} className={`${isBi ? "bg-transparent" : ""}`}>
                  <div className="font-medium">{ed.degree} · <span className="font-normal">{ed.inst}</span></div>
                  <div className="text-gray-400">{ed.from} — {ed.to}</div>
                </div>
              ) : null)}
            </div>
          </section>

          <footer className="mt-8 text-xs text-gray-400">
            <div>Resume made with Abuzzz Resume Builder — developed by Mohammed Abu Baker</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
