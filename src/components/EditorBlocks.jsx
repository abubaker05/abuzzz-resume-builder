// src/components/EditorBlocks.jsx

import React from 'react';

const generateId = () => `temp_${Math.random().toString(36).substring(2, 9)}`;

// --- Input Component Helpers ---
const InputField = ({ label, name, value, onChange, placeholder, isTextArea, type = 'text' }) => {
    const inputClasses = "w-full p-2 bg-gray-800 rounded text-white border border-gray-700 focus:border-cyan-500";
    return (
        <div className="mb-3">
            <label className="block text-sm text-gray-400 mb-1">{label}</label>
            {isTextArea ? (
                <textarea 
                    rows="3" 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={(e) => onChange(name, e.target.value)} 
                    className={inputClasses} 
                />
            ) : (
                <input 
                    type={type}
                    placeholder={placeholder} 
                    value={value} 
                    onChange={(e) => onChange(name, e.target.value)} 
                    className={inputClasses} 
                />
            )}
        </div>
    );
};

// --- Array Block Component ---
function ArrayBlockEditor({ title, arrayKey, items, onAdd, onRemove, onChange, fields, headingColor }) {
    return (
        <div className="p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 space-y-3">
            <div className="flex justify-between items-center mb-3 border-b border-gray-700/50 pb-2">
                <h4 className={`text-xl font-bold ${headingColor}`}>{title}</h4>
                <button onClick={() => onAdd(arrayKey)} className="bg-green-600 px-3 py-1 rounded text-white text-sm hover:bg-green-700">Add</button>
            </div>

            {items.length === 0 && <div className="text-gray-400">No {title.toLowerCase()} added yet.</div>}

            <div className="space-y-4">
                {items.map((item, idx) => (
                    <div key={item.id || item._id || idx} className="p-3 bg-gray-900 rounded border border-gray-700">
                        <div className="flex justify-end gap-2 mb-2">
                            <button onClick={() => onRemove(arrayKey, idx)} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                        </div>

                        {fields.map((f) => (
                            <InputField 
                                key={f.name}
                                label={f.label} 
                                name={f.name} 
                                value={item[f.name]}
                                onChange={(name, value) => onChange(arrayKey, idx, { [name]: value })}
                                placeholder={f.placeholder}
                                isTextArea={f.isTextArea}
                                type={f.type}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Main Editor Blocks Component ---
export function EditorBlocks({ data, updateField, updateArrayItem, addArrayItem, removeArrayItem, headingColor }) {
    
    return (
        <div className="space-y-8">
            
            {/* 1. Personal & Contact Info */}
            <div className="p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 space-y-3">
                <h3 className={`text-xl font-bold ${headingColor} mb-4 border-b border-gray-700/50 pb-2`}>1. Personal & Contact (ATS Header)</h3>
                
                <InputField label="Full Name" name="name" value={data.name} onChange={updateField} placeholder="Mohammed Abubakar" />
                <InputField label="Title" name="title" value={data.title} onChange={updateField} placeholder="Senior Software Engineer" />
                <InputField label="Email" name="contactEmail" value={data.contactEmail} onChange={updateField} type="email" />
                <InputField label="Phone" name="phone" value={data.phone} onChange={updateField} placeholder="(+91) 98765 43210" />
                <InputField label="Location" name="location" value={data.location} onChange={updateField} placeholder="Hyderabad, India" />
                <InputField label="LinkedIn URL" name="linkedin" value={data.linkedin} onChange={updateField} placeholder="https://linkedin.com/in/..." type="url" />
                <InputField label="GitHub URL" name="github" value={data.github} onChange={updateField} placeholder="https://github.com/..." type="url" />

                <h3 className={`text-lg font-bold ${headingColor} mt-6 border-t border-gray-700/50 pt-3`}>Summary (Keywords)</h3>
                <InputField label="Professional Summary (3-5 focused sentences)" name="summary" value={data.summary} onChange={updateField} placeholder="Results-driven professional with 5+ years experience..." isTextArea />
            </div>

            {/* 2. Skills (Single Field) */}
            <div className="p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <h3 className={`text-xl font-bold ${headingColor} mb-4 border-b border-gray-700/50 pb-2`}>2. Technical Skills</h3>
                
                <InputField 
                    label="Skills (Separate by comma, top to bottom priority)" 
                    name="skills" 
                    value={data.skills} 
                    onChange={updateField} 
                    placeholder="React, Node.js, SQL, REST APIs, Git, AWS" 
                    isTextArea
                />
            </div>

            {/* 3. Work Experience (Dynamic List) */}
            <ArrayBlockEditor
                title="3. Work Experience"
                arrayKey="experience"
                items={data.experience}
                onAdd={addArrayItem}
                onRemove={removeArrayItem}
                onChange={updateArrayItem}
                headingColor={headingColor}
                fields={[
                    { name: "role", label: "Job Title", placeholder: "Role (e.g. Frontend Developer)" },
                    { name: "company", label: "Company", placeholder: "Company Name" },
                    { name: "start", label: "Start Date", placeholder: "Jan 2022" },
                    { name: "end", label: "End Date", placeholder: "Aug 2024 or Present" },
                    { name: "description", label: "Key Achievement / Bullet Point", placeholder: "Achieved X, measured by Y. Use metrics (e.g., Reduced latency by 25%)", isTextArea: true },
                ]}
            />
            
            {/* 4. Education (Dynamic List) */}
            <ArrayBlockEditor
                title="4. Education"
                arrayKey="education"
                items={data.education}
                onAdd={addArrayItem}
                onRemove={removeArrayItem}
                onChange={updateArrayItem}
                headingColor={headingColor}
                fields={[
                    { name: "degree", label: "Degree/Certification", placeholder: "B.Tech in Computer Science" },
                    { name: "school", label: "School/University", placeholder: "JNTU, Hyderabad" },
                    { name: "year", label: "Year/Range", placeholder: "2018 — 2022" },
                    { name: "description", label: "Optional: GPA or Honors", placeholder: "Graduated with honors, GPA 3.8/4.0." },
                ]}
            />
            
        </div>
    );
}