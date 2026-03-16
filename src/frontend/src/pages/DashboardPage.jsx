import React, { useState, useEffect } from 'react';
import { Activity, Server, AlertCircle } from 'lucide-react';
import GrafanaEmbed from '../components/GrafanaEmbed';

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 10000); // refresh targets occasionally
    return () => clearInterval(interval);
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/applications');
      if (!response.ok) throw new Error('Failed to fetch applications');
      
      const data = await response.json();
      setApplications(data);
      if (data.length > 0 && !selectedApp) {
        setSelectedApp(data[0]); // Select first app by default
      }
    } catch (err) {
      setError('Could not connect to the Monitoring API.');
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
      {/* Sidebar - App List */}
      <div className="lg:col-span-1 border border-slate-700 rounded-xl bg-devops-card overflow-hidden h-[calc(100vh-12rem)] shadow-lg flex flex-col">
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
               No applications connected yet. Go to home and add one.
            </div>
          ) : (
            applications.map((app, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedApp?.target === app.target 
                    ? 'border-devops-primary bg-devops-primary/10' 
                    : 'border-transparent hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-devops-text truncate">{app.jobName}</h3>
                  <div className="h-2 w-2 rounded-full bg-devops-success shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                </div>
                <p className="text-xs text-devops-muted truncate">{app.target}</p>
                <p className="text-xs text-devops-primary mt-2">Active</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div className="lg:col-span-3 space-y-6">
        {selectedApp ? (
          <>
            {/* Top Section */}
            <div className="bg-devops-card border border-slate-700 rounded-xl p-6 shadow-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-devops-muted mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Application Status
                </p>
                <h2 className="text-2xl font-bold text-devops-text">{selectedApp.jobName}</h2>
                <a href={`http://${selectedApp.target}`} target="_blank" rel="noreferrer" className="text-sm text-devops-primary hover:underline mt-1 block">
                  http://{selectedApp.target}
                </a>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-2">
                  <div className="animate-pulse h-3 w-3 rounded-full bg-devops-success"></div>
                  <span className="text-sm font-bold text-devops-success">Monitoring Active</span>
                </div>
                <span className="text-xs font-semibold text-devops-muted px-3 py-1 bg-slate-800 rounded-full">Connected to Prometheus</span>
              </div>
            </div>

            {/* Middle Section: CPU & Memory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GrafanaEmbed title="CPU Usage" panelId={1} />
              <GrafanaEmbed title="Memory Usage" panelId={3} />
            </div>

            {/* Bottom Section: Network flow & Times */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GrafanaEmbed title="Request Rate" panelId={2} height="200px" />
              <GrafanaEmbed title="Error Rate" panelId={4} height="200px" />
              <GrafanaEmbed title="Response Time" panelId={5} height="200px" />
            </div>
            
            <div className="w-full">
               <GrafanaEmbed title="Application Uptime" panelId={6} height="150px" />
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-[500px] items-center justify-center border border-dashed border-slate-700 rounded-xl">
             <div className="text-devops-muted flex flex-col items-center">
               <Activity className="w-12 h-12 mb-4 opacity-50" />
               <p>Select an application to view metrics</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
