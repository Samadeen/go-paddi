# Go Paddi

**Plan trips in one place** — search real flights, hotels, and activities, build your itinerary, and manage every detail from a single dashboard.

Go Paddi is a modern trip-planning app powered by live travel data from the [Booking.com API (via RapidAPI)](https://rapidapi.com/DataCrawler/api/booking-com15). Search across destinations, compare options, add items to your trip, and persist your itinerary locally — all through a polished, responsive UI.

---

## Features

### Flights
- Search airports and cities with a debounced location picker
- Round-trip search with dates, cabin class, stops, sort order, currency, and passenger counts
- Browse results in a dedicated modal and add flights to your itinerary
- View flight details, price breakdown, and edit saved entries
- Itinerary persisted to `localStorage`

### Hotels
- Search destinations (cities, districts, airports) via autocomplete
- Rich search filters: dates, guests, rooms, price range, sort, categories, language, currency, and location
- Dynamic sort and filter options loaded from the API based on your search context
- Image carousels, map links, and full detail/price/edit modals

### Activities
- Search by city or specific attraction
- Filter by type, price, area, labels, dates, sort order, language, and currency
- Add activities from live search results with ratings, photos, and pricing
- Reorder activities within your day plan

### Trip dashboard
- Animated hero banner and trip summary header
- Quick-add CTA cards that open the correct search modal
- Empty states that guide you to add your first item
- Unified card interactions: details, pricing, edit, and remove — consistent across flights, hotels, and activities

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) |
| Data fetching | [TanStack Query](https://tanstack.com/query), [Axios](https://axios-http.com) |
| Icons | [Phosphor Icons](https://phosphoricons.com) |
| Animation | [Motion](https://motion.dev) |
| Language | TypeScript |

---

## Getting started

### Prerequisites

- Node.js 20+
- A [RapidAPI](https://rapidapi.com) account with the **booking-com15** API subscribed

### Installation

```bash
git clone <repository-url>
cd go-paddi
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_RAPIDAPI_API_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=booking-com15.p.rapidapi.com
BASE_URL=https://booking-com15.p.rapidapi.com/api/v1
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_RAPIDAPI_API_KEY` | Your RapidAPI key (required for all travel searches) |
| `RAPIDAPI_HOST` | API host — defaults to `booking-com15.p.rapidapi.com` |
| `BASE_URL` | Base URL for the Booking.com API |

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Production build

```bash
npm run build
npm start
```

---

## Project structure

```
go-paddi/
├── app/                          # Next.js App Router pages & layouts
│   └── (dashboard)/              # Dashboard route group
├── src/
│   ├── config/
│   │   ├── api.service.ts        # Axios client → RapidAPI
│   │   └── endpoints.ts          # Flights, hotels, attractions, meta routes
│   ├── hooks/
│   │   ├── use-flight/           # Flight search & location queries
│   │   ├── use-hotel/            # Hotel search, filters, sort queries
│   │   ├── use-attraction/       # Activity search & filter queries
│   │   ├── meta/                 # Currency, language, location meta
│   │   └── use-persisted-*.ts    # localStorage itinerary persistence
│   ├── modules/dashboard/
│   │   ├── _components/          # Flights, hotels, activities UI
│   │   ├── constants/            # Formatters, defaults, CTA config
│   │   ├── utils/                # API response → card data mappers
│   │   └── index.tsx             # Main dashboard composition
│   ├── components/               # Shared UI (header, shadcn primitives)
│   └── providers/                # React Query provider
└── public/assets/                # Static images & icons
```

---

## How it works

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  Dashboard  │────▶│  Search modals   │────▶│  RapidAPI           │
│  (CTA / +)  │     │  (flights/hotels │     │  booking-com15      │
└─────────────┘     │   /activities)   │     └─────────────────────┘
       │            └────────┬─────────┘              │
       │                     │                        │
       │            ┌────────▼─────────┐              │
       │            │  Results modal   │◀─────────────┘
       │            │  (pick & add)    │
       │            └────────┬─────────┘
       │                     │
       ▼            ┌────────▼─────────┐
┌─────────────┐     │  Itinerary cards │
│ localStorage│◀────│  details / edit  │
└─────────────┘     └──────────────────┘
```

1. **Search** — User opens a modal, picks a destination, sets filters, and queries the live API.
2. **Select** — Results appear in a scrollable modal; the user adds an item to their trip.
3. **Manage** — Cards show in the itinerary with full detail, price, and edit modals.
4. **Persist** — Flights, hotels, and activities are saved to `localStorage` and restored on reload.

---

## API coverage

The app integrates with the booking-com15 collection:

| Domain | Endpoints used |
|--------|----------------|
| **Flights** | Destination search, flight search, details, pricing |
| **Hotels** | Destination search, filters, sort, hotel search, details |
| **Attractions** | Location search, attraction search, availability, details, reviews |
| **Meta** | Currencies, languages, locations |

Additional hotel endpoints (reviews, photos, room lists, policies) are defined in `endpoints.ts` and ready for future features.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

---

## License

Private project — all rights reserved.
