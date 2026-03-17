import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Server, Globe, Hash } from "lucide-react";

const API_BASE = "http://localhost:4000";

export default function HomePage() {
  const [formData, setFormData] = useState({
    appName: "",
    appUrl: "",
    appPort: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/monitor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start monitoring");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <div className="bg-devops-card w-full max-w-md p-8 rounded-xl shadow-2xl border border-slate-700">
        <div className="flex items-center justify-center mb-8 gap-3">
          <Activity className="w-10 h-10 text-devops-primary" />
          <h2 className="text-2xl font-bold text-devops-text">
            Add Application
          </h2>
        </div>

        {error && (
          <div className="bg-devops-danger/10 border border-devops-danger/50 text-devops-danger p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="appName"
            placeholder="Application Name"
            required
            value={formData.appName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600"
          />

          <input
            type="text"
            name="appUrl"
            placeholder="Application URL"
            required
            value={formData.appUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600"
          />

          <input
            type="number"
            name="appPort"
            placeholder="Port"
            required
            value={formData.appPort}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600"
          />

          <button
            disabled={loading}
            className="w-full bg-devops-primary py-3 rounded text-white font-bold"
          >
            {loading ? "Configuring Monitoring..." : "Start Monitoring"}
          </button>
        </form>
      </div>
    </div>
  );
}
