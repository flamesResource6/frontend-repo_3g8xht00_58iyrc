import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'Dashboard' },
  { to: '/devices', label: 'Devices' },
  { to: '/forecast', label: 'Forecast' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur border-t z-50">
      <div className="max-w-4xl mx-auto grid grid-cols-4 text-sm">
        {tabs.map(t => (
          <Link key={t.to} to={t.to} className={`text-center py-3 ${pathname===t.to? 'text-blue-600 font-semibold':'text-gray-600'}`}>
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
