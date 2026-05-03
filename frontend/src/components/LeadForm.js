import React, { useState } from "react";

export default function LeadForm({ onSubmit, onClose, initialName = "", initialPhone = "" }) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) {
      return;
    }

    onSubmit({ name: name.trim(), phone: phone.trim() });
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Enter lead name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Enter phone number"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Save Lead
        </button>
      </div>
    </form>
  );
}
