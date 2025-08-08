Amazon Product Scraper App

A web application that scrapes Amazon's first page of search results based on a keyword input.

## Features
- Search for Amazon products
- Scrape product title, rating, reviews, and image
- Clean, user-friendly interface

## Technologies Used
- **Backend**: Bun, Express, Axios, JSDOM
- **Frontend**: HTML, CSS, Vanilla JS (with Vite)

## Setup Instructions

### Backend:
1. Install [Bun]
2. Navigate to `/backend`:
```bash
cd backend
bun install express axios jsdom
bun run index.ts
```

### Frontend:
1. Navigate to `/frontend`:
```bash
npm create vite@latest
# Choose vanilla template, then move index.html, style.css, main.js into `frontend/src`
cd frontend
npm install
npm run dev
```

## Usage
- Start the backend server on port 3000.
- Start the frontend dev server (usually at http://localhost:5173).
- Enter a keyword, hit search, view results!

## Notes
- Amazon may block scraping. Use proxies/user-agent rotation if needed.
- Built with zero dependencies on frontend frameworks to keep it light.
