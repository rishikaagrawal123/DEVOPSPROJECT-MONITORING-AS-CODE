import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Server, Globe, Hash } from 'lucide-react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    appName: '',
    appUrl: '',
    appPort: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to start monitoring');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <div className="bg-devops-card w-full max-w-md p-8 rounded-xl shadow-2xl border border-slate-700">
        <div className="flex items-center justify-center mb-8 gap-3">
          <Activity className="w-10 h-10 text-devops-primary" />
          <h2 className="text-2xl font-bold text-devops-text">Add Application</h2>
        </div>

        {error && (
          <div className="bg-devops-danger/10 border border-devops-danger/50 text-devops-danger p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-devops-muted mb-2">Application Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Server className="h-5 w-5 text-devops-muted" />
              </div>
              <input
                type="text"
                name="appName"
                required
                className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-800 text-devops-text focus:outline-none focus:ring-2 focus:ring-devops-primary focus:border-transparent transition-all"
                placeholder="e.g., payment-service"
                value={formData.appName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-devops-muted mb-2">Application URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-devops-muted" />
              </div>
              <input
                type="text"
                name="appUrl"
                required
                className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-800 text-devops-text focus:outline-none focus:ring-2 focus:ring-devops-primary focus:border-transparent transition-all"
                placeholder="e.g., sample_app"
                value={formData.appUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-devops-muted mb-2">Application Port</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-devops-muted" />
              </div>
              <input
                type="number"
                name="appPort"
                required
                className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-800 text-devops-text focus:outline-none focus:ring-2 focus:ring-devops-primary focus:border-transparent transition-all"
                placeholder="e.g., 5000"
                value={formData.appPort}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-devops-primary hover:bg-devops-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-devops-primary focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? 'Configuring Monitoring...' : 'Start Monitoring'}
          </button>
        </form>
      </div>
    </div>
  );
}
