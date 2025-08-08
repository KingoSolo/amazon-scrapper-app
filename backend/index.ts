import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";



const app = express();
const PORT = 3000;



app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword as string;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword query param is required" });
  }

  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Referer": "https://www.google.com/",
    "Connection": "keep-alive"
      },
       decompress: true 
    });

    console.log(response.data.slice(0, 500)); // Just the first 500 characters
    if (!response.data) {
      return res.status(500).json({ error: "No data received from Amazon." });
    }
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const products: { title: any; rating: any; reviews: any; image: any; }[] = [];
    const items = document.querySelectorAll(".s-result-item[data-asin]");

    items.forEach((item: { querySelector: (arg0: string) => { (): any; new(): any; textContent: string; getAttribute: { (arg0: string): string; new(): any; }; }; }) => {
      const title = item.querySelector("h2 span")?.textContent?.trim() || "";
      const rating = item.querySelector(".a-icon-alt")?.textContent?.split(" out of")[0] || "";
      const reviews = item.querySelector(".a-size-base.s-underline-text")?.textContent?.trim() || "";
      const image = item.querySelector("img")?.getAttribute("src") || "";

      if (title && image) {
        products.push({ title, rating, reviews, image });
      }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch or parse data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
