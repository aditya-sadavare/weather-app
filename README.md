# Weather & Air Quality Dashboard 🌤️

A JavaScript dashboard that fetches real-time weather and air quality data based on:

- **City name**
- **ZIP code + country**
- **Geolocation**

While also displaying predefined cities (Mumbai, Delhi, Pune) and retaining your last searched city via cookies.

---

## 🚀 Live Demo

*([https://weather-mp.netlify.app/](https://weather-mp.netlify.app/))*

---

## 🧠 Tech Stack

- **API**: OpenWeatherMap (Weather & Air Quality) :contentReference[oaicite:1]{index=1}
- **Fetching**: `fetch()` for async API calls
- **UI**: Plain JavaScript & DOM manipulation
- **Location**: Browser `navigator.geolocation`
- **State persistence**: Cookies & browser storage
- **Sound effects** on user interaction

---

## ⚙️ Features Overview

1. ✅ Get current weather:
   - Search by **city name**, **ZIP+country**, or **geo-location**
2. ✅ Show weather for **Mumbai**, **Delhi**, **Pune** on page load
3. ✅ Display details:
   - Temperature, humidity, wind, visibility, sunrise/sunset
4. ✅ Fetch and display **air quality index (AQI)** and pollutant values
5. ✅ Save and re-show last searched city via cookies
6. ✅ Live clock & session-based user interaction sounds
7. ✅ World/IST timezone handling

---

## 💻 Quick Start

1. Clone the repo and open `index.html`
2. Ensure you have OpenWeatherMap API key embedded in JS (`appid=…`)
3. Place icons and sound asset folders adjacent to HTML/JS
4. Open locally via browser (CORS-free)

---

## ✍️ Author

**Aditya Sadavare,Ritesh Ghadge**  

