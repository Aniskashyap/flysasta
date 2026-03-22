// ─────────────────────────────────────────────────────────────
//  FlySasta · Flight Service (API Layer)
//
//  This is the SINGLE file you edit to switch from mock → real API.
//
//  AMADEUS INTEGRATION (when ready):
//  1. Sign up at https://developers.amadeus.com/
//  2. Get your API_KEY and API_SECRET
//  3. Uncomment the Amadeus section below and remove the mock import
// ─────────────────────────────────────────────────────────────

import { searchFlights as mockSearch, AIRPORTS } from "../data/mockFlights";

// ── MOCK ADAPTER (active) ─────────────────────────────────────
export async function fetchFlights({ from, to, date, passengers = 1 }) {
  // Delegates to mock data layer
  return mockSearch({ from, to, date, passengers });
}

// ── AMADEUS ADAPTER (commented — uncomment when ready) ────────
/*
const AMADEUS_BASE = "https://test.api.amadeus.com/v2";
let _amadeusToken  = null;
let _tokenExpiry   = 0;

async function getAmadeusToken() {
  if (_amadeusToken && Date.now() < _tokenExpiry) return _amadeusToken;
  const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "client_credentials",
      client_id:     process.env.REACT_APP_AMADEUS_KEY,
      client_secret: process.env.REACT_APP_AMADEUS_SECRET,
    }),
  });
  const data = await res.json();
  _amadeusToken = data.access_token;
  _tokenExpiry  = Date.now() + data.expires_in * 1000 - 30000;
  return _amadeusToken;
}

export async function fetchFlights({ from, to, date, passengers = 1 }) {
  const token = await getAmadeusToken();
  const fromCode = resolveCode(from);
  const toCode   = resolveCode(to);
  const url = `${AMADEUS_BASE}/shopping/flight-offers?originLocationCode=${fromCode}&destinationLocationCode=${toCode}&departureDate=${date}&adults=${passengers}&max=20`;
  const res  = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error("Amadeus API error: " + res.status);
  const json = await res.json();
  return normalizeAmadeusResponse(json.data);
}

function normalizeAmadeusResponse(offers) {
  return offers.map(offer => {
    const seg  = offer.itineraries[0].segments[0];
    const price = parseFloat(offer.price.total);
    return {
      id:           offer.id,
      flightNumber: `${seg.carrierCode}-${seg.number}`,
      airline:      seg.carrierCode,
      airlineCode:  seg.carrierCode,
      from:         seg.departure.iataCode,
      to:           seg.arrival.iataCode,
      dep:          seg.departure.at.slice(11, 16),
      arr:          seg.arrival.at.slice(11, 16),
      duration:     offer.itineraries[0].duration.replace("PT","").toLowerCase(),
      stops:        offer.itineraries[0].segments.length - 1,
      price:        Math.round(price * 83), // USD→INR approx
      originalPrice:Math.round(price * 83 * 1.3),
      seats:        offer.numberOfBookableSeats,
      class:        offer.travelerPricings[0].fareDetailsBySegment[0].cabin,
      link:         "#",
    };
  });
}
*/

// ── HELPER: resolve city name → IATA code ────────────────────
export function resolveCode(input) {
  const upper = input.toUpperCase().trim();
  const byCode = AIRPORTS.find(a => a.code === upper);
  if (byCode) return byCode.code;
  const byCity = AIRPORTS.find(a => a.city.toLowerCase() === input.toLowerCase().trim());
  if (byCity) return byCity.code;
  return upper; // pass through and let API validate
}

export { AIRPORTS };
