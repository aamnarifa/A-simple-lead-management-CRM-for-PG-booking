import React, { useState } from "react";

const PHONE_RULE_MESSAGE = "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.";
const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value);

export default function LeadForm({ onSubmit, onClose, initialName = "", initialPhone = "" }) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedPhone = normalizePhone(phone);

    if (!name.trim() || !cleanedPhone) {
      setPhoneError(!cleanedPhone ? "Phone number is required." : "");
      return;
    }

    if (!isValidPhone(cleanedPhone)) {
      setPhoneError(PHONE_RULE_MESSAGE);
      return;
    }

    onSubmit({ name: name.trim(), phone: cleanedPhone });
    setName("");
    setPhone("");
    setPhoneError("");
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
          className="mt-2 w-full rounded-[10px] border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Enter lead name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => {
            setPhone(normalizePhone(event.target.value));
            setPhoneError("");
          }}
          className="mt-2 w-full rounded-[10px] border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          inputMode="numeric"
          maxLength={10}
          pattern="[6-9][0-9]{9}"
          placeholder="10-digit mobile number"
        />
        {phoneError && <p className="mt-2 text-xs font-medium text-red-600">{phoneError}</p>}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[10px] border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-[10px] bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-md"
        >
          Save Lead
        </button>
      </div>
    </form>
  );
}
