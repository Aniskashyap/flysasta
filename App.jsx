import { useState, useCallback } from "react";
import HomePage    from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import { fetchFlights } from "./api/flightService";

// ── Header ─────────────────────────────────────────────────────
function Header({ page, onHome }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-white/10 h-14 flex items-center px-4">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2 group">
          <span className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors"
            style={{ fontFamily: "'Georgia', serif" }}>
            FlySasta
          </span>
          <span className="text-lg">✈️</span>
        </button>

        <nav className="flex items-center gap-1">
          <button
            onClick={onHome}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              page === "home"
                ? "text-cyan-400 bg-cyan-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Home
          </button>
          <a
            href="https://wa.me/919999999999"
            target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Deal Alerts
          </a>
        </nav>
      </div>
    </header>
  );
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]               = useState("home");     // "home" | "results"
  const [searchParams, setSearchParams] = useState(null);
  const [flights, setFlights]         = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const handleSearch = useCallback(async (params) => {
    setSearchParams(params);
    setPage("results");
    setLoading(true);
    setError(null);
    setFlights(null);

    try {
      const results = await fetchFlights(params);
      setFlights(results);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  function goHome() {
    setPage("home");
    setFlights(null);
    setError(null);
  }

  return (
    <>
      <Header page={page} onHome={goHome} />

      {/* Push content below fixed header */}
      <div className="pt-14">
        {page === "home" && (
          <HomePage onSearch={handleSearch} />
        )}
        {page === "results" && (
          <ResultsPage
            searchParams={searchParams}
            flights={flights}
            loading={loading}
            error={error}
            onSearch={handleSearch}
          />
        )}
      </div>
    </>
  );
}
