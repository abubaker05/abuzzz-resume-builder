"use client";
import { useRouter } from "next/navigation";

export default function ThemesPage() {
  const router = useRouter();

  const themes = [
    { id: 1, name: "Neon Night", gradient: "from-purple-700 via-fuchsia-500 to-pink-500", accent: "text-pink-400" },
    { id: 2, name: "Glass Aurora", gradient: "from-cyan-400 via-blue-500 to-purple-600", accent: "text-cyan-300" },
    { id: 3, name: "Dark Luxe", gradient: "from-gray-800 via-gray-900 to-black", accent: "text-yellow-400" },
    { id: 4, name: "Cyber Gradient", gradient: "from-green-400 via-emerald-500 to-teal-600", accent: "text-green-300" },
  ];

  const handleSelect = (theme) => {
    localStorage.setItem("selectedTheme", theme.name);
    router.push("/builder");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 flex flex-col items-center justify-center text-white p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">
        Choose Your Portfolio Theme ✨
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => handleSelect(theme)}
            className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:scale-105 transition-all duration-300`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-90`} />

            {/* Glass overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Fake preview area */}
            <div className="relative p-6 h-64 flex flex-col justify-between">
              <div>
                <h2 className={`text-2xl font-semibold ${theme.accent}`}>{theme.name}</h2>
                <p className="text-sm text-gray-300 mt-1">Modern responsive design preview</p>
              </div>

              <div className="space-y-2">
                <div className="w-3/4 h-3 bg-white/40 rounded-lg" />
                <div className="w-1/2 h-3 bg-white/30 rounded-lg" />
                <div className="w-full h-10 bg-white/10 rounded-lg mt-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
