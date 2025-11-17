import React from 'react';

export default function Card({ title, children, right }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {right}
      </div>
      <div>{children}</div>
    </div>
  );
}
