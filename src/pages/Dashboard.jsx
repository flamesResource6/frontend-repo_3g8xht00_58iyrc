import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import Card from '../components/Card';

export default function Dashboard() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [realtime, setRealtime] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    const load = async () => {
      try {
        const [s, r] = await Promise.all([
          api.summary(token, 'day'),
          api.realtime(token),
        ]);
        if (!mounted) return;
        setSummary(s);
        setRealtime(r);
      } catch (e) { setError(e.message); }
    };
    load();
    const id = setInterval(load, 10000);
    return () => { mounted=false; clearInterval(id); };
  }, [token]);

  if (!token) return (
    <div className="p-6 space-y-4">
      <Card title="Welcome">
        <p className="text-gray-600">Please log in to view your energy dashboard.</p>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-4 pb-24">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Today's Usage (kWh)"><div className="text-2xl font-semibold">{summary?.total_kwh?.toFixed?.(2) ?? '—'}</div></Card>
        <Card title="Peak Hour"><div className="text-2xl font-semibold">{summary?.peak_hour ?? '—'}h</div></Card>
        <Card title="Avg kWh/hr"><div className="text-2xl font-semibold">{summary?.avg_kwh?.toFixed?.(2) ?? '—'}</div></Card>
      </div>
      <Card title="Realtime Readings">
        <div className="space-y-1 text-sm text-gray-700">
          {realtime?.slice(0,10).map((r,i)=>(
            <div key={i} className="flex justify-between">
              <span>{new Date(r.timestamp).toLocaleString()}</span>
              <span className="font-medium">{r.kwh} kWh</span>
            </div>
          ))}
          {(!realtime || realtime.length===0) && <div className="text-gray-500">No data yet</div>}
        </div>
      </Card>
    </div>
  );
}
