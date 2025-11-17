import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import Card from '../components/Card';

export default function Forecast() {
  const { token } = useAuth();
  const [horizon, setHorizon] = useState(24);
  const [series, setSeries] = useState([]);
  const [error, setError] = useState('');

  const run = async () => {
    if (!token) return;
    try { const res = await api.forecast(token, Number(horizon)); setSeries(res.forecast || []); }
    catch (e) { setError(e.message); }
  };

  useEffect(() => { run(); }, [token]);

  return (
    <div className="p-6 space-y-4 pb-24">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Card title="Forecast Controls">
        <div className="flex items-center gap-2">
          <label className="text-sm">Horizon (hours)</label>
          <input type="number" value={horizon} onChange={e=>setHorizon(e.target.value)} className="border rounded px-2 py-1 w-24" />
          <button onClick={run} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Run</button>
        </div>
      </Card>
      <Card title="Forecast (kWh)">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-700">
          {series.slice(0,48).map((v,i)=>(
            <div key={i} className="p-2 rounded bg-gray-50 border text-center">{v.toFixed(2)}</div>
          ))}
          {series.length===0 && <div className="text-gray-500">No forecast yet</div>}
        </div>
      </Card>
    </div>
  );
}
