import { useState } from "react";

export default function App() {
  const [status, setStatus] = useState("Idle");
  const [logs, setLogs] = useState([]);
  const [building, setBuilding] = useState(false);

  const dockerfile = `
# 🐳 Multi-Stage Dockerfile for React App

# ---- Stage 1: Build Stage ----
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Stage 2: Production Stage ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`;

  const startBuild = () => {
    setBuilding(true);
    setStatus("Building Docker Image...");
    setLogs([]);
    const fakeLogs = [
      "[+] Building 0.6s (7/7)",
      " => [internal] load build definition from Dockerfile",
      " => [internal] load .dockerignore",
      " => [1/4] FROM node:18-alpine",
      " => [2/4] COPY package*.json ./",
      " => [3/4] RUN npm install",
      " => [4/4] RUN npm run build",
      "Successfully built React App image 🎉",
      "Switching to Nginx runtime...",
      "Container running at http://localhost"
    ];

    fakeLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        if (i === fakeLogs.length - 1) {
          setStatus("✅ Docker Image Built Successfully!");
          setBuilding(false);
        }
      }, i * 600);
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl mb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-xl">🐳</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">
                  Dockerize React Application
                </h1>
                <p className="text-blue-200 text-xs">
                  Multi-stage build simulation
                </p>
              </div>
            </div>
            
            <div className={`px-3 py-1 rounded-full font-semibold text-xs ${
              building 
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                : status.startsWith("✅") 
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}>
              {building ? "🔄 Building" : status.startsWith("✅") ? "✅ Ready" : "🚀 Ready"}
            </div>
          </div>

          {/* Developer Info */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-white font-medium">Kapil Thakur</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg">
              <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span className="text-cyan-300 font-mono">24BCS80042</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg">
              <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-purple-300">
                Mentor: <span className="font-medium text-white">Mayank Sharma</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4 mb-4 min-h-0">
          {/* Dockerfile Preview */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-sm">📄</span>
              </div>
              <h2 className="font-bold text-white text-sm">Dockerfile</h2>
              <span className="text-xs text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded-full">Multi-stage</span>
            </div>
            
            <div className="flex-1 bg-slate-900/80 rounded-lg p-3 border border-slate-700 overflow-hidden">
              <pre className="text-green-400 text-xs font-mono leading-relaxed h-full overflow-y-auto">
                {dockerfile}
              </pre>
            </div>
          </div>

          {/* Build Logs */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <span className="text-sm">📋</span>
              </div>
              <h2 className="font-bold text-white text-sm">Build Logs</h2>
              <span className="text-xs text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded-full">Live</span>
            </div>
            
            <div className="flex-1 bg-slate-900/80 rounded-lg p-3 border border-slate-700 overflow-hidden">
              <div className="h-full overflow-y-auto font-mono text-xs">
                {logs.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-500">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🕓</div>
                      <p>Build logs will appear here...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, i) => (
                      <div key={i} className="text-green-400">
                        <span className="text-cyan-400">$</span> {log}
                      </div>
                    ))}
                    {building && (
                      <div className="flex items-center gap-2 text-amber-400">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                        Building...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                building ? "bg-amber-400" : status.startsWith("✅") ? "bg-green-400" : "bg-blue-400"
              }`}></div>
              <div>
                <p className={`font-semibold text-sm ${
                  status.startsWith("✅") ? "text-green-400" : building ? "text-amber-400" : "text-white"
                }`}>
                  {status}
                </p>
                <p className="text-xs text-blue-300">
                  {building ? "Building container..." : "Ready to create production image"}
                </p>
              </div>
            </div>
            
            <button
              onClick={startBuild}
              disabled={building}
              className={`px-6 py-2 rounded-lg font-bold text-white transition-all duration-300 flex items-center gap-2 text-sm ${
                building
                  ? "bg-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg"
              }`}
            >
              {building ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Building...
                </>
              ) : (
                <>
                  <span className="text-base">🚀</span>
                  Start Docker Build
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 mt-4 flex-shrink-0">
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10 text-center">
            <div className="text-lg mb-1">⚡</div>
            <h3 className="font-semibold text-white text-xs mb-1">Multi-Stage</h3>
            <p className="text-xs text-blue-200">Optimized builds</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10 text-center">
            <div className="text-lg mb-1">🔒</div>
            <h3 className="font-semibold text-white text-xs mb-1">Secure</h3>
            <p className="text-xs text-blue-200">Alpine Linux</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10 text-center">
            <div className="text-lg mb-1">🎯</div>
            <h3 className="font-semibold text-white text-xs mb-1">Production</h3>
            <p className="text-xs text-blue-200">Nginx serving</p>
          </div>
        </div>
      </div>
    </div>
  );
}