import React, { useState, useEffect } from "react";
import { Activity, Server, AlertCircle } from "lucide-react";
import GrafanaEmbed from "../components/GrafanaEmbed";

const API_BASE = "http://localhost:4000";

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/applications`);
      if (!response.ok) throw new Error("Failed to fetch applications");

      const data = await response.json();
      setApplications(data);

      if (data.length > 0 && !selectedApp) {
        setSelectedApp(data[0]);
      }

      setError("");
    } catch (err) {
      setError("Could not connect to the Monitoring API.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-devops-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 border border-slate-700 rounded-xl bg-devops-card overflow-hidden shadow-lg flex flex-col">
        <div className="px-5 py-4 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-lg font-bold flex items-center gap-2 text-devops-text">
            <Server className="w-5 h-5 text-devops-muted" /> Monitored Apps
          </h2>
        </div>

        <div className="p-3 overflow-y-auto flex-1 space-y-2">
          {error && (
            <div className="text-devops-danger text-sm p-3 bg-devops-danger/10 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {applications.length === 0 && !error ? (
            <div className="text-devops-muted text-sm text-center py-8">
              No applications connected yet.
            </div>
          ) : (
            applications.map((app, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedApp?.target === app.target
                    ? "border-devops-primary bg-devops-primary/10"
                    : "border-transparent hover:bg-slate-800"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-devops-text truncate">
                    {app.jobName}
                  </h3>

                  <div className="h-2 w-2 rounded-full bg-devops-success"></div>
                </div>

                <p className="text-xs text-devops-muted truncate">
                  {app.target}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Dashboard */}
      <div className="lg:col-span-3 space-y-6">
        {selectedApp ? (
          <>
            <div className="bg-devops-card border border-slate-700 rounded-xl p-6 shadow-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-devops-muted mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Application Status
                </p>

                <h2 className="text-2xl font-bold text-devops-text">
                  {selectedApp.jobName}
                </h2>
              </div>

              <span className="text-sm font-bold text-devops-success">
                Monitoring Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GrafanaEmbed title="CPU Usage" panelId={1} />
              <GrafanaEmbed title="Memory Usage" panelId={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GrafanaEmbed title="Request Rate" panelId={2} height="200px" />
              <GrafanaEmbed title="Error Rate" panelId={4} height="200px" />
              <GrafanaEmbed title="Response Time" panelId={5} height="200px" />
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-[500px] items-center justify-center border border-dashed border-slate-700 rounded-xl">
            Select an application
          </div>
        )}
      </div>
    </div>
  );
}
