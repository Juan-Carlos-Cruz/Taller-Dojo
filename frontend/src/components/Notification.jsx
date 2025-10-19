import React from 'react';

export default function Notification({ show, message, type }) {
  if (!show) return null;
  return (
    <div
      className={`fixed top-4 right-4 px-6 py-4 rounded-lg text-white font-semibold shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
