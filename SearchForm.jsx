import { useState } from "react";
import { AIRPORTS } from "../api/flightService";

// ── Auto-suggest dropdown ─────────────────────────────────────
function AirportInput({ label, icon, value, onChange, placeholder, id }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");

  const suggestions = query.length >= 2
    ? AIRPORTS.filter(a =>
        a.code.toLowerCase().includes(query.toLowerCase()) ||
        a.city.toLowerCase().includes(query.toLowerCase()) ||
        a.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  function pick(airport) {
    setQuery(`${airport.city} (${airport.code})`);
    onChange(airport.code);
    setOpen(false);
  }

  return (
    <div className="relative flex-1 min-w-0">
      <label htmlFor={id} className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
        {icon} {label}
      </label>
      <input
        id={id}
        type="text"
        autoComplete="off"
        value={query}
        placeholder={placeholder}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="w-full bg-white/10 border border-white/20 focus:border-cyan-400 focus:bg-white/15 text-white placeholder-slate-400 rounded-xl px-4 py-3.5 text-base font-medium outline-none transition-all duration-200 backdrop-blur-sm"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full mt-1 w-full bg-slate-800 border border-slate-600 rounded-xl shadow-2xl overflow-hidden">
          {suggestions.map(a => (
            <li
              key={a.code}
              onMouseDown={() => pick(a)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors"
            >
              <span className="text-lg font-black text-cyan-400 w-10 flex-shrink-0">{a.code}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{a.city}</p>
                <p className="text-xs text-slate-400 truncate">{a.name}, {a.country}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Main SearchForm ───────────────────────────────────────────
export default function SearchForm({ onSearch, initialValues = {} }) {
  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom]     = useState(initialValues.from || "");
  const [to, setTo]         = useState(initialValues.to   || "");
  const [date, setDate]     = useState(initialValues.date || today);
  const [pax,  setPax]      = useState(initialValues.pax  || 1);
  const [error, setError]   = useState("");

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!from.trim()) { setError("Please enter an origin city or airport code."); return; }
    if (!to.trim())   { setError("Please enter a destination city or airport code."); return; }
    if (!date)        { setError("Please select a departure date."); return; }
    onSearch({ from, to, date, pax });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col lg:flex-row gap-3 items-end">
        {/* From */}
        <AirportInput
          id="from" label="From" icon="🛫"
          value={from} onChange={setFrom}
          placeholder="City or airport code"
        />

        {/* Swap button */}
        <button
          type="button" onClick={swap}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/30 border border-white/20 hover:border-cyan-400 text-white flex items-center justify-center transition-all duration-200 text-lg self-end mb-0.5"
          title="Swap"
        >
          ⇄
        </button>

        {/* To */}
        <AirportInput
          id="to" label="To" icon="🛬"
          value={to} onChange={setTo}
          placeholder="City or airport code"
        />

        {/* Date */}
        <div className="flex-shrink-0 w-full lg:w-44">
          <label htmlFor="date" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            📅 Date
          </label>
          <input
            id="date" type="date"
            value={date} min={today}
            onChange={e => setDate(e.target.value)}
            className="w-full bg-white/10 border border-white/20 focus:border-cyan-400 text-white rounded-xl px-4 py-3.5 text-base font-medium outline-none transition-all duration-200 backdrop-blur-sm [color-scheme:dark]"
          />
        </div>

        {/* Passengers */}
        <div className="flex-shrink-0 w-full lg:w-32">
          <label htmlFor="pax" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            👤 Travellers
          </label>
          <select
            id="pax" value={pax} onChange={e => setPax(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 focus:border-cyan-400 text-white rounded-xl px-4 py-3.5 text-base font-medium outline-none transition-all duration-200 backdrop-blur-sm"
          >
            {[1,2,3,4,5,6].map(n => (
              <option key={n} value={n} className="bg-slate-800">{n} Adult{n>1?"s":""}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <button
          type="submit"
          className="flex-shrink-0 w-full lg:w-auto bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-900 font-black px-8 py-3.5 rounded-xl text-base transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          Search Flights
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          ⚠ {error}
        </p>
      )}
    </form>
  );
}
