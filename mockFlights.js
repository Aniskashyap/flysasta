// ─────────────────────────────────────────────────────────────
//  FlySasta · Mock Flight Database
//  Drop-in replacement for Amadeus / Skyscanner API response.
//  To switch to a real API, update src/api/flightService.js
// ─────────────────────────────────────────────────────────────

export const AIRPORTS = [
  { code: "DEL", city: "Delhi",       country: "India",          name: "Indira Gandhi International" },
  { code: "BOM", city: "Mumbai",      country: "India",          name: "Chhatrapati Shivaji Maharaj" },
  { code: "BLR", city: "Bangalore",   country: "India",          name: "Kempegowda International"    },
  { code: "MAA", city: "Chennai",     country: "India",          name: "Chennai International"       },
  { code: "HYD", city: "Hyderabad",   country: "India",          name: "Rajiv Gandhi International"  },
  { code: "CCU", city: "Kolkata",     country: "India",          name: "Netaji Subhas Chandra Bose"  },
  { code: "GOI", city: "Goa",         country: "India",          name: "Goa International"           },
  { code: "COK", city: "Kochi",       country: "India",          name: "Cochin International"        },
  { code: "JAI", city: "Jaipur",      country: "India",          name: "Jaipur International"        },
  { code: "AMD", city: "Ahmedabad",   country: "India",          name: "Sardar Vallabhbhai Patel"    },
  { code: "DXB", city: "Dubai",       country: "UAE",            name: "Dubai International"         },
  { code: "SIN", city: "Singapore",   country: "Singapore",      name: "Changi Airport"              },
  { code: "BKK", city: "Bangkok",     country: "Thailand",       name: "Suvarnabhumi Airport"        },
  { code: "LHR", city: "London",      country: "UK",             name: "Heathrow Airport"            },
  { code: "CDG", city: "Paris",       country: "France",         name: "Charles de Gaulle"           },
  { code: "JFK", city: "New York",    country: "USA",            name: "John F. Kennedy International"},
  { code: "SYD", city: "Sydney",      country: "Australia",      name: "Kingsford Smith Airport"     },
  { code: "NRT", city: "Tokyo",       country: "Japan",          name: "Narita International"        },
  { code: "KUL", city: "Kuala Lumpur",country: "Malaysia",       name: "Kuala Lumpur International"  },
  { code: "AUH", city: "Abu Dhabi",   country: "UAE",            name: "Zayed International"         },
];

export const AIRLINES = [
  { code: "6E", name: "IndiGo",       logo: "🟦", color: "#2563eb" },
  { code: "AI", name: "Air India",    logo: "🔴", color: "#dc2626" },
  { code: "SG", name: "SpiceJet",     logo: "🟠", color: "#ea580c" },
  { code: "QP", name: "Akasa Air",    logo: "🟡", color: "#d97706" },
  { code: "EK", name: "Emirates",     logo: "🟥", color: "#b91c1c" },
  { code: "SQ", name: "Singapore Air",logo: "🔵", color: "#1d4ed8" },
  { code: "TG", name: "Thai Airways", logo: "🟣", color: "#7c3aed" },
  { code: "BA", name: "British Airways",logo:"⬜",color: "#1e3a5f" },
  { code: "AF", name: "Air France",   logo: "🔷", color: "#1d4ed8" },
  { code: "QF", name: "Qantas",       logo: "🟤", color: "#92400e" },
];

// Base flight templates — searchFlights() generates dynamic results from these
const BASE_ROUTES = [
  { from:"DEL", to:"BOM", depH:5,  depM:30, dur:130, basePrice:1899 },
  { from:"DEL", to:"BOM", depH:8,  depM:0,  dur:125, basePrice:2399 },
  { from:"DEL", to:"BOM", depH:11, depM:30, dur:135, basePrice:1749 },
  { from:"DEL", to:"BOM", depH:15, depM:15, dur:130, basePrice:2099 },
  { from:"DEL", to:"BOM", depH:18, depM:45, dur:140, basePrice:2649 },
  { from:"BOM", to:"DEL", depH:6,  depM:0,  dur:130, basePrice:1950 },
  { from:"BOM", to:"DEL", depH:9,  depM:30, dur:128, basePrice:2250 },
  { from:"BOM", to:"DEL", depH:13, depM:0,  dur:133, basePrice:1850 },
  { from:"DEL", to:"BLR", depH:6,  depM:15, dur:165, basePrice:2299 },
  { from:"DEL", to:"BLR", depH:10, depM:0,  dur:170, basePrice:2799 },
  { from:"DEL", to:"BLR", depH:16, depM:30, dur:168, basePrice:2099 },
  { from:"BLR", to:"DEL", depH:7,  depM:0,  dur:165, basePrice:2199 },
  { from:"BLR", to:"DEL", depH:14, depM:30, dur:170, basePrice:2650 },
  { from:"DEL", to:"GOI", depH:7,  depM:45, dur:160, basePrice:2499 },
  { from:"DEL", to:"GOI", depH:12, depM:0,  dur:155, basePrice:2999 },
  { from:"BOM", to:"GOI", depH:6,  depM:30, dur:65,  basePrice:1499 },
  { from:"BOM", to:"GOI", depH:10, depM:0,  dur:70,  basePrice:1799 },
  { from:"BOM", to:"GOI", depH:14, depM:15, dur:68,  basePrice:1649 },
  { from:"DEL", to:"DXB", depH:3,  depM:0,  dur:195, basePrice:8999 },
  { from:"DEL", to:"DXB", depH:9,  depM:30, dur:200, basePrice:12499},
  { from:"BOM", to:"DXB", depH:2,  depM:30, dur:185, basePrice:7499 },
  { from:"BOM", to:"DXB", depH:10, depM:0,  dur:190, basePrice:9999 },
  { from:"DEL", to:"SIN", depH:1,  depM:0,  dur:345, basePrice:14999},
  { from:"DEL", to:"SIN", depH:9,  depM:0,  dur:340, basePrice:18999},
  { from:"BOM", to:"SIN", depH:0,  depM:30, dur:330, basePrice:13499},
  { from:"DEL", to:"BKK", depH:8,  depM:0,  dur:310, basePrice:13999},
  { from:"BOM", to:"BKK", depH:10, depM:0,  dur:295, basePrice:12999},
  { from:"DEL", to:"LHR", depH:2,  depM:30, dur:535, basePrice:39999},
  { from:"DEL", to:"LHR", depH:14, depM:0,  dur:540, basePrice:52999},
  { from:"BOM", to:"LHR", depH:3,  depM:0,  dur:520, basePrice:37999},
  { from:"DEL", to:"JFK", depH:1,  depM:30, dur:900, basePrice:54999},
  { from:"BOM", to:"JFK", depH:2,  depM:0,  dur:930, basePrice:49999},
  { from:"DEL", to:"NRT", depH:8,  depM:0,  dur:480, basePrice:29999},
  { from:"BOM", to:"NRT", depH:6,  depM:30, dur:500, basePrice:27999},
  { from:"DEL", to:"SYD", depH:9,  depM:30, dur:660, basePrice:44999},
  { from:"BOM", to:"COK", depH:7,  depM:0,  dur:90,  basePrice:1599 },
  { from:"BOM", to:"COK", depH:11, depM:30, dur:95,  basePrice:1999 },
  { from:"DEL", to:"COK", depH:8,  depM:0,  dur:200, basePrice:2899 },
  { from:"HYD", to:"DEL", depH:6,  depM:30, dur:150, basePrice:1999 },
  { from:"HYD", to:"BOM", depH:8,  depM:0,  dur:100, basePrice:1599 },
  { from:"MAA", to:"DEL", depH:5,  depM:45, dur:175, basePrice:2199 },
  { from:"MAA", to:"BOM", depH:7,  depM:0,  dur:125, basePrice:1799 },
  { from:"CCU", to:"DEL", depH:6,  depM:0,  dur:155, basePrice:1899 },
  { from:"CCU", to:"BOM", depH:7,  depM:30, dur:175, basePrice:2299 },
  { from:"DEL", to:"CDG", depH:4,  depM:0,  dur:510, basePrice:42999},
  { from:"DEL", to:"KUL", depH:7,  depM:0,  dur:360, basePrice:16999},
];

function pad(n) { return String(n).padStart(2,"0"); }
function addMinutes(h, m, mins) {
  const total = h * 60 + m + mins;
  return { h: Math.floor(total / 60) % 24, m: total % 60 };
}
function formatTime(h, m) { return `${pad(h)}:${pad(m)}`; }
function formatDuration(mins) {
  const h = Math.floor(mins / 60), m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

let _idCounter = 1;
function makeFlights(route, dateStr) {
  const airlinePool = route.basePrice < 5000
    ? ["6E","AI","SG","QP"]
    : route.basePrice < 20000
    ? ["6E","AI","EK","SQ"]
    : ["EK","SQ","BA","AF","QF","TG"];

  return airlinePool.map((airlineCode, i) => {
    const airline = AIRLINES.find(a => a.code === airlineCode) || AIRLINES[0];
    const priceJitter = 1 + (i * 0.12) + (Math.random() * 0.08 - 0.04);
    const price = Math.round(route.basePrice * priceJitter / 100) * 100;
    const durJitter = route.dur + (i % 3 === 0 ? -5 : i % 3 === 1 ? 0 : 8);
    const depH = (route.depH + Math.floor(i * 1.5)) % 24;
    const depM = (route.depM + i * 15) % 60;
    const arr  = addMinutes(depH, depM, durJitter);
    const stops = route.basePrice > 30000 && i === 2 ? 1 : 0;
    const flightNum = `${airlineCode}-${1000 + _idCounter * 7 + i}`;

    return {
      id:          `${flightNum}-${dateStr}`,
      flightNumber: flightNum,
      airline:     airline.name,
      airlineCode: airline.code,
      airlineLogo: airline.logo,
      airlineColor:airline.color,
      from:        route.from,
      to:          route.to,
      dep:         formatTime(depH, depM),
      arr:         formatTime(arr.h, arr.m),
      duration:    formatDuration(durJitter),
      durationMins:durJitter,
      stops,
      stopLabel:   stops === 0 ? "Non-stop" : `${stops} stop`,
      price,
      originalPrice: Math.round(price * (1.2 + Math.random() * 0.3) / 100) * 100,
      date:        dateStr,
      class:       "Economy",
      seats:       Math.floor(Math.random() * 9) + 1,
      baggage:     route.basePrice > 15000 ? "30kg check-in · 10kg cabin" : "15kg check-in · 7kg cabin",
      refundable:  i === 1,
      aircraft:    ["Airbus A320","Boeing 737 MAX","Airbus A321neo","Boeing 787","Airbus A380"][i % 5],
      link:        "#",
    };
  });
}

/**
 * searchFlights({ from, to, date })
 * Returns a Promise (mimics async API call).
 * Replace the body of this function with a real fetch() to use Amadeus/Skyscanner.
 */
export function searchFlights({ from, to, date }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fromUpper = from.toUpperCase().trim();
      const toUpper   = to.toUpperCase().trim();

      // Support city name lookup too
      const fromAirport = AIRPORTS.find(a =>
        a.code === fromUpper || a.city.toLowerCase() === from.toLowerCase()
      );
      const toAirport = AIRPORTS.find(a =>
        a.code === toUpper || a.city.toLowerCase() === to.toLowerCase()
      );

      if (!fromAirport || !toAirport) {
        reject(new Error(`Airport not found. Try codes like DEL, BOM, DXB or city names.`));
        return;
      }
      if (fromAirport.code === toAirport.code) {
        reject(new Error("Origin and destination cannot be the same."));
        return;
      }

      _idCounter++;
      const routes = BASE_ROUTES.filter(
        r => r.from === fromAirport.code && r.to === toAirport.code
      );

      if (routes.length === 0) {
        resolve([]);
        return;
      }

      const flights = routes.flatMap(r => makeFlights(r, date));
      // Sort by price ascending by default
      flights.sort((a, b) => a.price - b.price);
      resolve(flights);
    }, 1200 + Math.random() * 600); // realistic network delay
  });
}

export function getAirport(code) {
  return AIRPORTS.find(a => a.code === code);
}
