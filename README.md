# 🌤️ Weather App — Full Stack

Built by **Monali Khot**

A full-stack weather application built with Next.js that provides real-time weather data, 5-day forecasts, and complete weather query management with database persistence.

---

## About PM Accelerator

Product Manager Accelerator is the largest Product Manager learning community in the world, helping aspiring and experienced product managers accelerate their careers. Through mentorship, coaching, job placement support, and hands-on real-world training, PM Accelerator empowers professionals to break into and advance in product management at top tech companies.

[Visit PM Accelerator on LinkedIn →](https://www.linkedin.com/school/product-manager-accelerator/)

---

## Features

### Frontend (Tech Assessment #1)
- Search weather by city name, zip code, GPS coordinates, or landmarks
- Current weather display — temperature, feels like, humidity, wind speed, visibility
- 5-day forecast with daily high/low temperatures and weather icons
- "Use My Current Location" via browser Geolocation API
- Responsive design — works on desktop, tablet, and mobile
- Graceful error handling with user-friendly messages
- Loading spinner during API calls

### Backend (Tech Assessment #2)
- **CREATE** — Save a location + date range weather query to the database with full validation
- **READ** — View all saved weather queries in a sortable history table
- **UPDATE** — Edit saved records (location, dates, notes) with re-validation
- **DELETE** — Remove records with confirmation prompt
- **Export** — Download all saved data as JSON, CSV, or Markdown
- **YouTube API** — Shows relevant videos about the searched location
- **Google Maps** — Interactive embedded map of the searched location

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Weather API | OpenWeatherMap |
| Video API | YouTube Data API v3 |
| Maps API | Google Maps Embed API |
| HTTP Client | Axios |

---

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm
- A Supabase account (free)
- API keys (see below)

### 1. Clone the repo
```bash
git clone https://github.com/monali40/weather-app.git
cd weather-app

### 2. Install dependencies
npm install

### 3. Create .env.local in the root folder
OPENWEATHER_API_KEY=your_openweathermap_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key

### 4. Set up the Supabase database
Run this SQL in your Supabase SQL Editor:
CREATE TABLE weather_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  country TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  avg_temp DECIMAL,
  min_temp DECIMAL,
  max_temp DECIMAL,
  weather_condition TEXT,
  humidity INTEGER,
  wind_speed DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE weather_queries DISABLE ROW LEVEL SECURITY;

### 5. Run the development server
npm run dev

### 6. Open the app
	Page						URL
Main weather search		http://localhost:3000
Weather history & CRUD	http://localhost:3000/history

API Keys
API	Free Tier	How to Get
OpenWeatherMap	60 calls/min	openweathermap.org/api
Supabase	500MB, 2 projects	supabase.com
YouTube Data API v3	10,000 units/day	console.cloud.google.com
Google Maps Embed API	Free, no limit	console.cloud.google.com
 
How to Use
Main Page (Weather Search)
Type a city name, zip code, or coordinates in the search bar
Click Search or press Enter
View current weather, 5-day forecast, YouTube videos, and map
Click "Use My Current Location" to get weather for your GPS location
Toggle between °C and °F using the unit buttons
History Page (CRUD)
Fill in location + date range → click Save Weather Query
View all saved queries in the table below
Click Edit to update a record
Click Delete to remove a record
Use Download JSON / CSV / Markdown buttons to export data
README.md
Displaying README.md.



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
