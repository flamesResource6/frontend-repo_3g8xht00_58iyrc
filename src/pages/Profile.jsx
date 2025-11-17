import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';

export default function Profile() {
  const { user, token, login, register, logout } = useAuth();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError('');
    try {
      if (mode==='login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
    } catch (e) { setError(e.message); }
  };

  if (!token) return (
    <div className="p-6 space-y-4 pb-24">
      <Card title={mode==='login' ? 'Login' : 'Create Account'}>
        <form onSubmit={submit} className="space-y-3">
          {mode==='register' && (
            <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full border rounded px-3 py-2" />
          )}
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border rounded px-3 py-2" />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full border rounded px-3 py-2" />
          {error && <div className="text-sm text-red-500">{error}</div>}
          <button className="w-full bg-blue-600 text-white rounded py-2">{mode==='login'? 'Login':'Register'}</button>
        </form>
        <div className="mt-3 text-sm text-gray-600">
          {mode==='login' ? (
            <button onClick={()=>setMode('register')} className="underline">Need an account? Register</button>
          ) : (
            <button onClick={()=>setMode('login')} className="underline">Have an account? Login</button>
          )}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-4 pb-24">
      <Card title="Profile">
        <div className="text-gray-700 text-sm">Signed in as <span className="font-medium">{user?.email}</span></div>
        <button onClick={logout} className="mt-3 px-3 py-1 rounded bg-gray-800 text-white text-sm">Logout</button>
      </Card>
    </div>
  );
}
