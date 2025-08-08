document.getElementById("searchBtn").addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid data format");

    resultsDiv.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.image}" alt="product image">
        <div>
          <strong>${item.title}</strong><br>
          ⭐ ${item.rating} (${item.reviews} reviews)
        </div>
      `;
      resultsDiv.appendChild(card);
    });
  } catch (err) {
    resultsDiv.innerHTML = `Error: ${err.message}`;
  }
});
