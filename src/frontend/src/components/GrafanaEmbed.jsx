import React from "react";

export default function GrafanaEmbed({
  dashboardUid = "sample-app",
  panelId = 2,
  title = "Prometheus Metrics",
  height = "300px",
}) {
  const grafanaUrl = `http://localhost:3000/d-solo/${dashboardUid}/sample-app-dashboard?orgId=1&panelId=${panelId}&theme=dark`;

  return (
    <div className="bg-devops-card rounded-xl shadow-lg border border-slate-700 overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700">
        <h3 className="text-sm font-semibold text-devops-text">{title}</h3>
      </div>

      <div className="flex-1 w-full relative" style={{ minHeight: height }}>
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
          Loading Grafana Panel...
        </div>

        <iframe
          src={grafanaUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="w-full h-full relative z-10"
          title={title}
        />
      </div>
    </div>
  );
}
