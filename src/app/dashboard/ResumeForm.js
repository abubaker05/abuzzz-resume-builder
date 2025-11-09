"use client";
import React from "react";

/*
  A detailed form to capture:
  - basic info (name, role, email, phone, location, links)
  - summary
  - experiences (array with role, company, start, end, description)
  - education (degree, institution, duration)
  - certifications (title, issuer, year)
  - skills (comma separated)
*/

export default function ResumeForm({ data, setData }) {
  const update = (patch) => setData({ ...data, ...patch });

  const addExperience = () => {
    const ex = { id: Date.now(), role: "", company: "", start: "", end: "", description: "" };
    update({ experiences: [...(data.experiences || []), ex] });
  };
  const updateExperience = (id, patch) => {
    update({ experiences: (data.experiences || []).map(e => e.id === id ? { ...e, ...patch } : e) });
  };
  const removeExperience = (id) => update({ experiences: (data.experiences || []).filter(e => e.id !== id) });

  const addEducation = () => {
    const ed = { id: Date.now(), degree: "", institution: "", duration: "" };
    update({ education: [...(data.education || []), ed] });
  };
  const updateEducation = (id, patch) => {
    update({ education: (data.education || []).map(e => e.id === id ? { ...e, ...patch } : e) });
  };
  const removeEducation = (id) => update({ education: (data.education || []).filter(e => e.id !== id) });

  const addCertification = () => {
    const c = { id: Date.now(), title: "", issuer: "", year: "" };
    update({ certifications: [...(data.certifications || []), c] });
  };
  const updateCertification = (id, patch) => {
    update({ certifications: (data.certifications || []).map(c => c.id === id ? { ...c, ...patch } : c) });
  };
  const removeCertification = (id) => update({ certifications: (data.certifications || []).filter(c => c.id !== id) });

  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>Build Your ATS Resume</h3>

      <label className="label">Choose Format</label>
      <select value={data.format || "bi"} onChange={(e) => update({ format: e.target.value })} style={inputStyle}>
        <option value="bi">Bi-Column Format</option>
        <option value="single">Single Column</option>
      </select>

      <label className="label">Full Name</label>
      <input style={inputStyle} value={data.name || ""} onChange={(e) => update({ name: e.target.value })} />

      <label className="label">Role</label>
      <input style={inputStyle} value={data.role || ""} onChange={(e) => update({ role: e.target.value })} />

      <label className="label">Email</label>
      <input style={inputStyle} value={data.email || ""} onChange={(e) => update({ email: e.target.value })} />

      <label className="label">Phone</label>
      <input style={inputStyle} value={data.phone || ""} onChange={(e) => update({ phone: e.target.value })} />

      <label className="label">Location</label>
      <input style={inputStyle} value={data.location || ""} onChange={(e) => update({ location: e.target.value })} />

      <label className="label">LinkedIn URL</label>
      <input style={inputStyle} value={data.linkedin || ""} onChange={(e) => update({ linkedin: e.target.value })} />

      <label className="label">GitHub URL</label>
      <input style={inputStyle} value={data.github || ""} onChange={(e) => update({ github: e.target.value })} />

      <label className="label">Professional Summary</label>
      <textarea style={{ ...inputStyle, minHeight: 80 }} value={data.summary || ""} onChange={(e) => update({ summary: e.target.value })} />

      {/* EXPERIENCES */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ margin: 0 }}>Experience</h4>
          <button onClick={addExperience} style={smallBtn}>+ Add Experience</button>
        </div>

        {(data.experiences || []).length === 0 && <div style={{ color: "#bbb", marginTop: 8 }}>No experience yet</div>}

        {(data.experiences || []).map((ex) => (
          <div key={ex.id} style={{ marginTop: 8, padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Role" value={ex.role} onChange={e => updateExperience(ex.id, { role: e.target.value })} style={miniInput} />
              <input placeholder="Company" value={ex.company} onChange={e => updateExperience(ex.id, { company: e.target.value })} style={miniInput} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input placeholder="Start (e.g., Jun 2021)" value={ex.start} onChange={e => updateExperience(ex.id, { start: e.target.value })} style={miniInput} />
              <input placeholder="End (e.g., Present)" value={ex.end} onChange={e => updateExperience(ex.id, { end: e.target.value })} style={miniInput} />
            </div>
            <textarea placeholder="Brief description / achievements" value={ex.description} onChange={e => updateExperience(ex.id, { description: e.target.value })} style={{ ...inputStyle, marginTop: 8 }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
              <button onClick={() => removeExperience(ex.id)} style={delBtn}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h4 style={{ margin: 0 }}>Education</h4>
          <button onClick={addEducation} style={smallBtn}>+ Add Education</button>
        </div>
        {(data.education || []).map(ed => (
          <div key={ed.id} style={{ marginTop:8, padding:8, background:"rgba(255,255,255,0.03)", borderRadius:8 }}>
            <input placeholder="Degree (e.g., B.Tech Computer Science)" value={ed.degree} onChange={e => updateEducation(ed.id, { degree: e.target.value })} style={miniInput} />
            <input placeholder="Institution" value={ed.institution} onChange={e => updateEducation(ed.id, { institution: e.target.value })} style={{ ...miniInput, marginTop:8 }} />
            <input placeholder="Duration (e.g., 2018 - 2022)" value={ed.duration} onChange={e => updateEducation(ed.id, { duration: e.target.value })} style={{ ...miniInput, marginTop:8 }} />
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
              <button onClick={() => removeEducation(ed.id)} style={delBtn}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h4 style={{ margin: 0 }}>Certifications</h4>
          <button onClick={addCertification} style={smallBtn}>+ Add Certification</button>
        </div>

        {(data.certifications || []).map(c => (
          <div key={c.id} style={{ marginTop:8, padding:8, background:"rgba(255,255,255,0.03)", borderRadius:8 }}>
            <input placeholder="Certification Title" value={c.title} onChange={e => updateCertification(c.id, { title: e.target.value })} style={miniInput} />
            <input placeholder="Issuer (Org)" value={c.issuer} onChange={e => updateCertification(c.id, { issuer: e.target.value })} style={{ ...miniInput, marginTop:8 }} />
            <input placeholder="Year" value={c.year} onChange={e => updateCertification(c.id, { year: e.target.value })} style={{ ...miniInput, marginTop:8 }} />
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
              <button onClick={() => removeCertification(c.id)} style={delBtn}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <label className="label" style={{ marginTop:12 }}>Skills (comma separated)</label>
      <input style={inputStyle} value={data.skills || ""} onChange={(e) => update({ skills: e.target.value })} />

    </div>
  );
}

const inputStyle = { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", color: "#fff", marginTop: 6 };
const miniInput = { flex: 1, padding: "6px 8px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color:"#fff" };
const smallBtn = { background: "#06b6d4", color: "#042024", padding: "6px 8px", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer" };
const delBtn = { background: "transparent", color: "#ff6b6b", border: "1px solid rgba(255,255,255,0.06)", padding: "6px 8px", borderRadius: 6, cursor: "pointer" };
