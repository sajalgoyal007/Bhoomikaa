// src/pages/CouncilLogin.tsx

import { useState } from "react";
import { loginCouncil } from "../lib/councilAuth";

const CouncilLogin = () => {
  const [councilId, setCouncilId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginCouncil(councilId.trim(), password.trim());
    if (!ok) {
      setError("Invalid Council ID or Password");
      return;
    }
    // successful login → redirect to council dashboard
    window.location.href = "/council"; // 👈 yahan /council ko apne actual council path se match karna
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50 mb-1">
          Council Login
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Only authorised land council members can access this dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Council ID
            </label>
            <input
              value={councilId}
              onChange={(e) => setCouncilId(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-50 text-sm outline-none focus:border-emerald-400"
              placeholder="Enter Council ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-50 text-sm outline-none focus:border-emerald-400"
              placeholder="Enter Password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-700 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-medium py-2.5 mt-2 transition"
          >
            Login as Council
          </button>

          <p className="text-[11px] text-slate-500 text-center mt-2">
            Demo credentials – ID: <span className="font-mono">COUNCIL2025</span>, Password: <span className="font-mono">admin@123</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CouncilLogin;
