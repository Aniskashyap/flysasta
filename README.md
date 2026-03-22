# ✈ FlySasta — Global Flight Search

A Skyscanner-style flight search app built with **React + Tailwind CSS v4**.  
Fully functional with mock data. Structured to plug in **Amadeus API** in one file.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

---

## 🗂 Project Structure

```
flysasta/
├── src/
│   ├── api/
│   │   └── flightService.js     ← 🔑 SWAP API HERE (mock ↔ Amadeus)
│   ├── data/
│   │   └── mockFlights.js       ← Mock flight generator (40+ routes)
│   ├── components/
│   │   ├── SearchForm.jsx        ← Airport autocomplete search form
│   │   ├── FlightCard.jsx        ← Individual flight result card
│   │   └── ResultsList.jsx       ← Sort + filter + card list
│   ├── pages/
│   │   ├── HomePage.jsx          ← Hero + popular routes
│   │   └── ResultsPage.jsx       ← Results layout
│   ├── App.jsx                   ← Root component + state
│   ├── main.jsx                  ← Entry point
│   └── index.css                 ← Global styles + animations
├── index.html
├── vite.config.js
└── package.json
```

---

## ✈ Supported Demo Routes

Search any of these city names or IATA codes:

| Route | Example |
|-------|---------|
| Delhi → Mumbai | DEL → BOM |
| Mumbai → Goa | BOM → GOI |
| Delhi → Dubai | DEL → DXB |
| Delhi → Singapore | DEL → SIN |
| Mumbai → London | BOM → LHR |
| Delhi → New York | DEL → JFK |
| Delhi → Bangkok | DEL → BKK |
| Bangalore → Delhi | BLR → DEL |
| Hyderabad → Mumbai | HYD → BOM |
| Kochi → Mumbai | COK → BOM |
| + 30 more routes | — |

You can also type city names: "Delhi", "Mumbai", "Dubai", "Singapore", "London"

---

## 🔌 Switching to Amadeus API

1. Sign up at https://developers.amadeus.com/ (free sandbox)
2. Get your `API_KEY` and `API_SECRET`
3. Create `.env` in project root:
   ```
   REACT_APP_AMADEUS_KEY=your_key_here
   REACT_APP_AMADEUS_SECRET=your_secret_here
   ```
4. Open `src/api/flightService.js`
5. Comment out the mock adapter block
6. Uncomment the Amadeus adapter block

That's it — all components use `fetchFlights()` from this single file.

---

## 🎨 Features

- ✅ Airport autocomplete (city name + IATA code)
- ✅ Swap origin/destination button
- ✅ Passenger count selector
- ✅ Loading skeletons
- ✅ Sort: Price ↑↓ · Departure · Duration
- ✅ Filter: Airline · Stops · Max Price slider
- ✅ "Lowest Fare" badge on cheapest result
- ✅ "Fastest" badge on shortest flight
- ✅ Urgency: "Only N seats left"
- ✅ Refundable badge
- ✅ Discount % shown
- ✅ Staggered fade-in animations
- ✅ Fully responsive (mobile-first)
- ✅ Popular routes quick-search
- ✅ Error + empty states

---

## 🛠 Tech Stack

- React 18 (functional components + hooks)
- Tailwind CSS v4
- Vite 5
- Zero external dependencies beyond React

---

© 2026 FlySasta
