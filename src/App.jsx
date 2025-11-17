import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Forecast from './pages/Forecast';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900">
        <header className="sticky top-0 bg-white/70 backdrop-blur border-b z-40">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-bold">SmartEnergy AI</h1>
            <div className="text-sm text-gray-600">Your AI-powered energy assistant</div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </AuthProvider>
  );
}

export default App;
