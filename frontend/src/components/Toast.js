import React, { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2600);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-2xl shadow-slate-200/40 transition-all duration-300">
      <p className="text-sm font-medium text-slate-900">{message}</p>
    </div>
  );
}
