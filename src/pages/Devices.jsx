import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import Card from '../components/Card';

export default function Devices() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    if (!token) return;
    try { setItems(await api.listAppliances(token)); }
    catch (e) { setError(e.message); }
  };

  useEffect(() => { load(); }, [token]);

  const toggle = async (id) => {
    try { await api.toggleAppliance(token, id); await load(); }
    catch (e) { setError(e.message); }
  };

  if (!token) return <div className="p-6"><Card title="Devices"><p className="text-gray-600">Log in to manage devices.</p></Card></div>;

  return (
    <div className="p-6 space-y-4 pb-24">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {items.map(d => (
        <Card key={d.id} title={d.name} right={<span className={`text-xs px-2 py-1 rounded ${d.is_on? 'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>{d.is_on? 'On':'Off'}</span>}>
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-gray-600">Power: {d.power_watts}W · Room: {d.room || '—'}</div>
            <button onClick={()=>toggle(d.id)} className="px-3 py-1 text-sm rounded bg-blue-600 text-white">Toggle</button>
          </div>
        </Card>
      ))}
      {items.length===0 && <Card title="No devices"><p className="text-gray-600">You have no devices yet.</p></Card>}
    </div>
  );
}
