import React, { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2600);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-[10px] border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-200/40 transition-all duration-300">
      <p className="text-sm font-medium text-slate-900">{message}</p>
    </div>
  );
}
