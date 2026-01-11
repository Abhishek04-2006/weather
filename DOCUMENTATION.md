# 📚 Weather Dashboard - Complete Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Installation & Setup](#installation--setup)
4. [Core Modules](#core-modules)
5. [API Integration](#api-integration)
6. [Data Flow](#data-flow)
7. [UI Components](#ui-components)
8. [Storage System](#storage-system)
9. [Error Handling](#error-handling)
10. [Responsive Design](#responsive-design)
11. [Accessibility](#accessibility)
12. [Performance Optimization](#performance-optimization)
13. [Browser Compatibility](#browser-compatibility)
14. [Deployment](#deployment)
15. [Troubleshooting](#troubleshooting)
16. [API Reference](#api-reference)
17. [Code Examples](#code-examples)
18. [Contributing](#contributing)

---

## Project Overview

### Description
Weather Dashboard is a modern, responsive web application that provides real-time weather information and 5-day forecasts for cities worldwide. Built with vanilla JavaScript, HTML5, and CSS3, it demonstrates best practices in modern web development including async/await patterns, API integration, local storage management, and responsive design.

### Key Features
- **Real-time Weather Data**: Current weather conditions from OpenWeatherMap API
- **5-Day Forecast**: Extended weather predictions
- **City Search**: Smart search with validation and error handling
- **Geolocation**: Automatic location detection
- **Favorites Management**: Save and manage favorite cities
- **Local Storage**: Persistent user preferences
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG 2.1 compliant
- **Premium UI**: Glassmorphism design with smooth animations

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: OpenWeatherMap API, Geolocation API, Local Storage API
- **Design**: Glassmorphism, CSS Grid, Flexbox
- **Fonts**: Google Fonts (Inter)
- **Version Control**: Git & GitHub

### Project Statistics
- **Total Lines of Code**: 3,638+
- **JavaScript**: 58.4% (1,500+ lines)
- **CSS**: 34.1% (900+ lines)
- **HTML**: 7.5% (200+ lines)
- **Files**: 21 total (8 documentation, 8 code, 5 screenshots)

---

## Architecture

### Project Structure
```
weather-dashboard/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # Complete styling and design system
├── js/
│   ├── api.js               # Weather API integration module
│   ├── storage.js           # Local storage management
│   └── app.js               # Main application logic
├── screenshots/
│   ├── dashboard-preview.png
│   ├── desktop-view.png
│   ├── mobile-view.png
│   ├── forecast-section.png
│   └── favorites-section.png
├── README.md                 # Main documentation
├── SETUP.md                  # Quick setup guide
├── FEATURES.md               # Features documentation
├── API_KEY_GUIDE.md         # API key setup guide
├── CHECKLIST.md             # Deployment checklist
├── PROJECT_SUMMARY.md       # Project overview
├── GITHUB_SETUP.md          # GitHub deployment guide
├── SUBMISSION_COMPLETE.md   # Submission summary
├── LICENSE                   # MIT License
└── .gitignore               # Git ignore rules
```

### Design Pattern
The application follows a **modular architecture** with separation of concerns:

1. **Presentation Layer** (`index.html`, `styles.css`)
   - HTML structure and semantic markup
   - CSS styling and design system
   - Responsive layouts

2. **Business Logic Layer** (`app.js`)
   - Application state management
   - UI rendering and updates
   - Event handling
   - User interactions

3. **Data Layer** (`api.js`, `storage.js`)
   - API communication
   - Data fetching and formatting
   - Local storage operations
   - Data persistence

### Module Dependencies
```
index.html
    ├── css/styles.css
    └── js/
        ├── storage.js (loaded first)
        ├── api.js (loaded second)
        └── app.js (loaded last, depends on storage.js and api.js)
```

---

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Text editor (VS Code, Sublime Text, etc.)
- OpenWeatherMap API key (free tier)
- Git (optional, for version control)

### Quick Start

#### Step 1: Clone or Download
```bash
# Clone from GitHub
git clone https://github.com/Abhishek04-2006/weather.git
cd weather

# Or download ZIP and extract
```

#### Step 2: Get API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Verify email
4. Go to [API Keys](https://home.openweathermap.org/api_keys)
5. Copy your API key

#### Step 3: Configure API Key
1. Open `js/api.js`
2. Find line 8:
   ```javascript
   API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY_HERE',
   ```
3. Replace with your actual key:
   ```javascript
   API_KEY: 'your_actual_api_key_here',
   ```
4. Save the file

#### Step 4: Run Application

**Option A: Direct File Access**
```bash
# Simply open index.html in your browser
open index.html  # macOS
start index.html # Windows
```

**Option B: Local Server (Recommended)**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

#### Step 5: Access Application
- Direct: `file:///path/to/index.html`
- Server: `http://localhost:8000`

### Configuration Options

#### Units (Metric/Imperial)
Edit `js/storage.js`, line 116:
```javascript
getUnitPreference() {
    return localStorage.getItem(this.KEYS.UNIT_PREFERENCE) || 'metric'; // or 'imperial'
}
```

#### Default City
Edit `js/app.js`, line 76 to set a default city instead of geolocation:
```javascript
async loadInitialData() {
    this.renderFavorites();
    await this.searchWeather('London'); // Set your default city
}
```

---

## Core Modules

### 1. API Module (`js/api.js`)

**Purpose**: Handles all communication with OpenWeatherMap API

**Key Functions**:

#### `getCurrentWeather(city, units)`
Fetches current weather for a city.

```javascript
async getCurrentWeather(city, units = 'metric') {
    // Returns formatted weather object
}
```

**Parameters**:
- `city` (string): City name
- `units` (string): 'metric' or 'imperial'

**Returns**: Promise<Object> with weather data

**Example**:
```javascript
const weather = await WeatherAPI.getCurrentWeather('London', 'metric');
console.log(weather.temperature); // 15
console.log(weather.description); // "clear sky"
```

#### `getForecast(city, units)`
Fetches 5-day forecast.

```javascript
async getForecast(city, units = 'metric') {
    // Returns array of 5 forecast objects
}
```

**Returns**: Promise<Array> with 5 forecast objects

#### `getCurrentWeatherByCoords(lat, lon, units)`
Fetches weather by coordinates (for geolocation).

```javascript
async getCurrentWeatherByCoords(lat, lon, units = 'metric') {
    // Returns formatted weather object
}
```

**Parameters**:
- `lat` (number): Latitude
- `lon` (number): Longitude
- `units` (string): 'metric' or 'imperial'

#### Helper Functions

**`formatCurrentWeather(data, units)`**
Transforms raw API data into application format.

**`formatForecast(data, units)`**
Processes forecast data, selecting one entry per day at noon.

**`getWeatherEmoji(iconCode)`**
Maps weather icon codes to emoji icons.

**`getWindDirection(degrees)`**
Converts wind degrees to compass direction (N, NE, E, etc.).

**`formatTime(timestamp, timezone)`**
Formats Unix timestamp to readable time string.

---

### 2. Storage Module (`js/storage.js`)

**Purpose**: Manages all local storage operations

**Storage Keys**:
```javascript
KEYS: {
    FAVORITES: 'weather_favorites',
    LAST_SEARCH: 'weather_last_search',
    UNIT_PREFERENCE: 'weather_unit_preference',
    THEME: 'weather_theme'
}
```

**Key Functions**:

#### `getFavorites()`
Retrieves favorite cities from local storage.

```javascript
getFavorites() {
    // Returns array of favorite city objects
}
```

**Returns**: Array<Object>
```javascript
[
    {
        name: "London",
        country: "GB",
        lat: 51.5074,
        lon: -0.1278,
        addedAt: "2026-01-11T10:00:00.000Z"
    }
]
```

#### `addFavorite(cityData)`
Adds a city to favorites.

```javascript
addFavorite({
    name: "London",
    country: "GB",
    lat: 51.5074,
    lon: -0.1278
})
```

**Returns**: boolean (true if added, false if already exists)

#### `removeFavorite(cityName)`
Removes a city from favorites.

```javascript
removeFavorite("London")
```

#### `isFavorite(cityName)`
Checks if a city is in favorites.

```javascript
if (StorageManager.isFavorite("London")) {
    // City is favorited
}
```

#### `saveLastSearch(cityName)`
Saves the last searched city.

#### `getLastSearch()`
Retrieves the last searched city.

#### `getUnitPreference()`
Gets user's preferred units (metric/imperial).

---

### 3. Application Module (`js/app.js`)

**Purpose**: Main application logic and UI management

**Class**: `WeatherDashboard`

**Properties**:
```javascript
{
    currentWeather: null,      // Current weather data
    forecast: null,            // Forecast data
    units: 'metric',          // User's unit preference
    searchInput: HTMLElement, // Search input element
    searchBtn: HTMLElement,   // Search button element
    // ... other DOM element references
}
```

**Key Methods**:

#### `constructor()`
Initializes the application.

```javascript
constructor() {
    this.currentWeather = null;
    this.forecast = null;
    this.units = StorageManager.getUnitPreference();
    this.initializeElements();
    this.attachEventListeners();
    this.loadInitialData();
}
```

#### `handleSearch()`
Handles search button click.

```javascript
async handleSearch() {
    const city = this.searchInput.value.trim();
    if (!city) {
        this.showError('Please enter a city name');
        return;
    }
    await this.searchWeather(city);
}
```

#### `searchWeather(city)`
Main search function.

```javascript
async searchWeather(city) {
    try {
        this.showLoading();
        const [currentWeather, forecast] = await Promise.all([
            WeatherAPI.getCurrentWeather(city, this.units),
            WeatherAPI.getForecast(city, this.units)
        ]);
        this.currentWeather = currentWeather;
        this.forecast = forecast;
        this.renderCurrentWeather();
        this.renderForecast();
        this.hideLoading();
    } catch (error) {
        this.showError(error.message);
    }
}
```

#### `handleGeolocation()`
Handles geolocation button click.

```javascript
handleGeolocation() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            // Fetch weather by coordinates
        },
        (error) => {
            // Handle geolocation errors
        }
    );
}
```

#### `renderCurrentWeather()`
Renders current weather UI.

#### `renderForecast()`
Renders 5-day forecast UI.

#### `toggleFavorite()`
Toggles favorite status for current city.

#### `renderFavorites()`
Renders favorites section.

---

## API Integration

### OpenWeatherMap API

**Base URLs**:
```javascript
BASE_URL: 'https://api.openweathermap.org/data/2.5'
GEO_URL: 'https://api.openweathermap.org/geo/1.0'
```

### Endpoints Used

#### 1. Current Weather
```
GET /data/2.5/weather
```

**Parameters**:
- `q`: City name (e.g., "London" or "London,UK")
- `units`: metric or imperial
- `appid`: Your API key

**Example Request**:
```javascript
const url = `${BASE_URL}/weather?q=London&units=metric&appid=${API_KEY}`;
const response = await fetch(url);
const data = await response.json();
```

**Response Structure**:
```json
{
    "coord": {"lon": -0.1257, "lat": 51.5085},
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "main": {
        "temp": 15.5,
        "feels_like": 14.2,
        "temp_min": 14.0,
        "temp_max": 17.0,
        "pressure": 1013,
        "humidity": 65
    },
    "wind": {
        "speed": 5.5,
        "deg": 230
    },
    "clouds": {"all": 0},
    "sys": {
        "country": "GB",
        "sunrise": 1736581200,
        "sunset": 1736612400
    },
    "name": "London"
}
```

#### 2. 5-Day Forecast
```
GET /data/2.5/forecast
```

**Parameters**: Same as current weather

**Returns**: 40 data points (every 3 hours for 5 days)

**Example Request**:
```javascript
const url = `${BASE_URL}/forecast?q=London&units=metric&appid=${API_KEY}`;
const response = await fetch(url);
const data = await response.json();
```

#### 3. Geocoding
```
GET /geo/1.0/direct
```

**Parameters**:
- `q`: City name
- `limit`: Number of results (default: 1)
- `appid`: Your API key

**Example Request**:
```javascript
const url = `${GEO_URL}/direct?q=London&limit=1&appid=${API_KEY}`;
const response = await fetch(url);
const data = await response.json();
```

### Error Handling

**HTTP Status Codes**:
- `200`: Success
- `401`: Invalid API key
- `404`: City not found
- `429`: Rate limit exceeded
- `500`: Server error

**Error Handling Example**:
```javascript
if (!response.ok) {
    if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
    } else if (response.status === 401) {
        throw new Error('API key invalid. Please check your configuration.');
    } else {
        throw new Error(`Failed to fetch weather data (${response.status})`);
    }
}
```

### Rate Limiting

**Free Tier Limits**:
- 60 calls per minute
- 1,000,000 calls per month

**Best Practices**:
- Cache results in local storage
- Debounce search input
- Use Promise.all() for parallel requests
- Implement retry logic with exponential backoff

---

## Data Flow

### Application Flow Diagram

```
User Action
    ↓
Event Handler (app.js)
    ↓
API Request (api.js)
    ↓
OpenWeatherMap API
    ↓
Response Processing (api.js)
    ↓
Data Formatting
    ↓
UI Rendering (app.js)
    ↓
Local Storage Update (storage.js)
    ↓
Display to User
```

### Search Flow

```
1. User enters city name
2. Click search button or press Enter
3. handleSearch() validates input
4. searchWeather() called
5. showLoading() displays spinner
6. Promise.all() fetches current + forecast
7. Data formatted and stored
8. renderCurrentWeather() updates UI
9. renderForecast() updates UI
10. hideLoading() removes spinner
11. saveLastSearch() persists city
```

### Geolocation Flow

```
1. User clicks location button
2. handleGeolocation() called
3. navigator.geolocation.getCurrentPosition()
4. Browser requests permission
5. User allows/denies
6. Success: Get coordinates
7. Fetch weather by coordinates
8. Update UI with location name
9. Error: Show error message
```

### Favorites Flow

```
1. User views weather for a city
2. Clicks heart icon
3. toggleFavorite() called
4. Check if already favorited
5. If yes: removeFavorite()
6. If no: addFavorite()
7. Update local storage
8. Re-render current weather (update heart)
9. Re-render favorites section
```

---

## UI Components

### Design System

**Color Palette**:
```css
--color-primary: hsl(220, 90%, 56%);        /* Vibrant Blue */
--color-secondary: hsl(280, 70%, 60%);      /* Purple */
--color-accent: hsl(340, 82%, 62%);         /* Pink */
--color-bg-primary: hsl(220, 26%, 8%);      /* Dark Background */
--color-text-primary: hsl(0, 0%, 98%);      /* White Text */
```

**Typography**:
```css
--font-family: 'Inter', sans-serif;
--font-size-base: 1rem;
--font-size-xl: 1.25rem;
--font-size-3xl: 2rem;
--font-size-5xl: 3.5rem;
```

**Spacing**:
```css
--spacing-xs: 0.5rem;
--spacing-sm: 0.75rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
```

**Border Radius**:
```css
--radius-sm: 0.5rem;
--radius-md: 0.75rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
--radius-full: 9999px;
```

### Component Structure

#### 1. Header
```html
<header class="header">
    <div class="header-content">
        <div class="logo">
            <span class="logo-icon">🌤️</span>
            <span>Weather Dashboard</span>
        </div>
        <button id="locationBtn" class="btn btn-secondary btn-icon">
            📍
        </button>
    </div>
</header>
```

#### 2. Search Section
```html
<section class="search-section">
    <div class="search-container">
        <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" id="searchInput" class="search-input" 
                   placeholder="Search for a city...">
            <button id="searchBtn" class="btn">Search</button>
        </div>
        <div class="quick-actions">
            <button class="quick-action-btn">London</button>
            <!-- More quick action buttons -->
        </div>
    </div>
</section>
```

#### 3. Current Weather Card
Dynamically generated with weather data.

#### 4. Forecast Section
Dynamically generated with 5 forecast cards.

#### 5. Favorites Section
Dynamically generated with favorite city cards.

### Glassmorphism Effect

```css
.weather-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
}
```

### Animations

**Float Animation**:
```css
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}
```

**Fade In**:
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

**Heart Beat** (for favorite toggle):
```css
@keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.3); }
    50% { transform: scale(1.1); }
}
```

---

## Storage System

### Local Storage Structure

**Favorites**:
```json
{
    "weather_favorites": [
        {
            "name": "London",
            "country": "GB",
            "lat": 51.5074,
            "lon": -0.1278,
            "addedAt": "2026-01-11T10:00:00.000Z"
        }
    ]
}
```

**Last Search**:
```json
{
    "weather_last_search": "London"
}
```

**Unit Preference**:
```json
{
    "weather_unit_preference": "metric"
}
```

### Storage Limits

**Browser Limits**:
- Chrome: 10 MB
- Firefox: 10 MB
- Safari: 5 MB
- Edge: 10 MB

**Current Usage**: ~5-10 KB (with 10 favorites)

### Data Persistence

**When Data is Saved**:
- After successful search (last search)
- When adding/removing favorites
- When changing unit preference

**When Data is Retrieved**:
- On application load
- When rendering favorites
- When checking favorite status

---

## Error Handling

### Error Types

#### 1. API Errors
```javascript
try {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found');
        }
        // Handle other status codes
    }
} catch (error) {
    this.showError(error.message);
}
```

#### 2. Network Errors
```javascript
catch (error) {
    if (error.message === 'Failed to fetch') {
        this.showError('Network error. Please check your connection.');
    }
}
```

#### 3. Geolocation Errors
```javascript
navigator.geolocation.getCurrentPosition(
    success,
    (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.showError('Location permission denied');
                break;
            case error.POSITION_UNAVAILABLE:
                this.showError('Location unavailable');
                break;
            case error.TIMEOUT:
                this.showError('Location request timed out');
                break;
        }
    }
);
```

#### 4. Storage Errors
```javascript
try {
    localStorage.setItem(key, value);
} catch (error) {
    if (error.name === 'QuotaExceededError') {
        console.error('Storage quota exceeded');
    }
}
```

### User-Friendly Error Messages

**Display**:
```javascript
showError(message) {
    const html = `
        <div class="error-message fade-in">
            <div class="error-icon">⚠️</div>
            <div class="error-content">
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
            </div>
        </div>
    `;
    this.errorContainer.innerHTML = html;
    setTimeout(() => this.hideError(), 5000); // Auto-hide after 5s
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First */
/* Base styles: < 768px */

/* Tablet */
@media (max-width: 768px) {
    /* Tablet-specific styles */
}

/* Desktop */
@media (min-width: 769px) {
    /* Desktop-specific styles */
}
```

### Mobile Optimizations

**Touch Targets**:
- Minimum 44x44px for buttons
- Larger padding on mobile
- Increased spacing between elements

**Typography**:
```css
@media (max-width: 768px) {
    :root {
        --font-size-5xl: 2.5rem;  /* Smaller on mobile */
        --font-size-3xl: 1.75rem;
    }
}
```

**Layout**:
```css
@media (max-width: 768px) {
    .weather-grid {
        grid-template-columns: 1fr; /* Single column */
    }
    
    .weather-main {
        grid-template-columns: 1fr; /* Stack vertically */
    }
}
```

---

## Accessibility

### WCAG 2.1 Compliance

**Level AA Compliance**:
- ✅ Color contrast ratio > 4.5:1
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Semantic HTML

### ARIA Labels

```html
<button 
    id="searchBtn" 
    class="btn"
    aria-label="Search for weather">
    Search
</button>

<button 
    class="favorite-btn" 
    onclick="app.toggleFavorite()"
    aria-label="Toggle favorite">
    ❤️
</button>
```

### Keyboard Navigation

**Tab Order**:
1. Search input
2. Search button
3. Location button
4. Quick action buttons
5. Favorite button
6. Favorite cards

**Keyboard Shortcuts**:
- `Enter` in search input: Trigger search
- `Tab`: Navigate forward
- `Shift + Tab`: Navigate backward
- `Space/Enter`: Activate buttons

### Screen Reader Support

**Semantic HTML**:
```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

**Alt Text** (for future image additions):
```html
<img src="weather-icon.png" alt="Sunny weather icon">
```

---

## Performance Optimization

### Loading Performance

**Metrics**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Page Size: < 500 KB

**Optimizations**:
1. **Minify CSS/JS** (for production)
2. **Compress Images** (screenshots are for documentation)
3. **Lazy Load** favorites weather data
4. **Cache API Responses** in memory

### Runtime Performance

**Efficient DOM Updates**:
```javascript
// Good: Single innerHTML update
this.container.innerHTML = html;

// Bad: Multiple DOM manipulations
this.container.appendChild(element1);
this.container.appendChild(element2);
```

**Debouncing** (for future search-as-you-type):
```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
```

**Parallel API Calls**:
```javascript
// Fetch current weather and forecast in parallel
const [currentWeather, forecast] = await Promise.all([
    WeatherAPI.getCurrentWeather(city, this.units),
    WeatherAPI.getForecast(city, this.units)
]);
```

### Memory Management

**Cleanup**:
- No memory leaks (no circular references)
- Event listeners properly attached
- No global variables pollution

---

## Browser Compatibility

### Supported Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

### Required Features

**JavaScript**:
- ES6+ (Classes, Arrow Functions, Template Literals)
- Async/Await
- Fetch API
- Local Storage API
- Geolocation API

**CSS**:
- CSS Grid
- Flexbox
- CSS Variables
- Backdrop Filter (for glassmorphism)

### Polyfills

Not required for modern browsers. For older browser support, consider:
- Babel for JavaScript transpilation
- Autoprefixer for CSS vendor prefixes

---

## Deployment

### GitHub Pages

**Steps**:
1. Push code to GitHub
2. Go to Settings → Pages
3. Select `main` branch
4. Save
5. Access at: `https://username.github.io/weather/`

### Netlify

**Steps**:
1. Connect GitHub repository
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy

### Vercel

**Steps**:
1. Import GitHub repository
2. Framework: Other
3. Deploy

### Custom Domain

**DNS Configuration**:
```
Type: CNAME
Name: weather
Value: username.github.io
```

---

## Troubleshooting

### Common Issues

#### 1. API Key Not Working

**Symptoms**: 401 Unauthorized error

**Solutions**:
- Wait 10-15 minutes for new keys to activate
- Check key is copied correctly (32 characters)
- Verify email is confirmed
- Check API key is for OpenWeatherMap (not Google)

#### 2. City Not Found

**Symptoms**: 404 error

**Solutions**:
- Check spelling
- Try adding country code: "London, UK"
- Try major cities first
- Use English city names

#### 3. Geolocation Not Working

**Symptoms**: Permission denied or unavailable

**Solutions**:
- Use HTTPS (required for geolocation)
- Check browser permissions
- Enable location services on device
- Try different browser

#### 4. Favorites Not Saving

**Symptoms**: Favorites disappear on reload

**Solutions**:
- Check not in incognito/private mode
- Clear browser cache
- Check local storage is enabled
- Check storage quota not exceeded

#### 5. UI Not Loading

**Symptoms**: Blank page or broken layout

**Solutions**:
- Check browser console for errors
- Verify all files are present
- Clear browser cache
- Check CSS file loaded
- Verify JavaScript files loaded in correct order

---

## API Reference

### WeatherAPI Object

#### Methods

**`getCurrentWeather(city, units)`**
- **Parameters**: 
  - `city` (string): City name
  - `units` (string, optional): 'metric' or 'imperial', default: 'metric'
- **Returns**: Promise<Object>
- **Throws**: Error if city not found or API error

**`getCurrentWeatherByCoords(lat, lon, units)`**
- **Parameters**:
  - `lat` (number): Latitude
  - `lon` (number): Longitude
  - `units` (string, optional): 'metric' or 'imperial'
- **Returns**: Promise<Object>

**`getForecast(city, units)`**
- **Parameters**: Same as getCurrentWeather
- **Returns**: Promise<Array> of 5 forecast objects

**`getForecastByCoords(lat, lon, units)`**
- **Parameters**: Same as getCurrentWeatherByCoords
- **Returns**: Promise<Array> of 5 forecast objects

**`getWeatherEmoji(iconCode)`**
- **Parameters**: `iconCode` (string): OpenWeatherMap icon code
- **Returns**: string (emoji)

**`getWindDirection(degrees)`**
- **Parameters**: `degrees` (number): Wind direction in degrees
- **Returns**: string (N, NE, E, SE, S, SW, W, NW)

**`formatTime(timestamp, timezone)`**
- **Parameters**:
  - `timestamp` (number): Unix timestamp
  - `timezone` (number): Timezone offset in seconds
- **Returns**: string (formatted time)

### StorageManager Object

#### Methods

**`getFavorites()`**
- **Returns**: Array<Object> of favorite cities

**`addFavorite(cityData)`**
- **Parameters**: `cityData` (Object) with name, country, lat, lon
- **Returns**: boolean (success)

**`removeFavorite(cityName)`**
- **Parameters**: `cityName` (string)
- **Returns**: boolean (success)

**`isFavorite(cityName)`**
- **Parameters**: `cityName` (string)
- **Returns**: boolean

**`saveLastSearch(cityName)`**
- **Parameters**: `cityName` (string)

**`getLastSearch()`**
- **Returns**: string | null

**`getUnitPreference()`**
- **Returns**: string ('metric' or 'imperial')

**`saveUnitPreference(unit)`**
- **Parameters**: `unit` (string): 'metric' or 'imperial'

**`clearAll()`**
- Clears all stored data

**`getStats()`**
- **Returns**: Object with storage statistics

---

## Code Examples

### Example 1: Search for Weather

```javascript
// Get weather for a city
async function getWeatherForCity(cityName) {
    try {
        const weather = await WeatherAPI.getCurrentWeather(cityName, 'metric');
        console.log(`Temperature in ${weather.city}: ${weather.temperature}°C`);
        console.log(`Conditions: ${weather.description}`);
        console.log(`Humidity: ${weather.humidity}%`);
        console.log(`Wind: ${weather.windSpeed} m/s ${WeatherAPI.getWindDirection(weather.windDeg)}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getWeatherForCity('London');
```

### Example 2: Get 5-Day Forecast

```javascript
// Get forecast
async function getForecastForCity(cityName) {
    try {
        const forecast = await WeatherAPI.getForecast(cityName, 'metric');
        forecast.forEach(day => {
            console.log(`${day.dateString}: ${day.temperature}°C - ${day.description}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getForecastForCity('Paris');
```

### Example 3: Manage Favorites

```javascript
// Add to favorites
const cityData = {
    name: 'Tokyo',
    country: 'JP',
    lat: 35.6762,
    lon: 139.6503
};

if (StorageManager.addFavorite(cityData)) {
    console.log('Added to favorites!');
} else {
    console.log('Already in favorites');
}

// Check if favorited
if (StorageManager.isFavorite('Tokyo')) {
    console.log('Tokyo is in favorites');
}

// Get all favorites
const favorites = StorageManager.getFavorites();
console.log('Favorite cities:', favorites.map(f => f.name));

// Remove from favorites
StorageManager.removeFavorite('Tokyo');
```

### Example 4: Use Geolocation

```javascript
// Get weather for current location
function getWeatherForCurrentLocation() {
    if (!navigator.geolocation) {
        console.error('Geolocation not supported');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            const weather = await WeatherAPI.getCurrentWeatherByCoords(
                latitude, 
                longitude, 
                'metric'
            );
            console.log(`Your location: ${weather.city}, ${weather.country}`);
            console.log(`Temperature: ${weather.temperature}°C`);
        },
        (error) => {
            console.error('Geolocation error:', error.message);
        }
    );
}

getWeatherForCurrentLocation();
```

### Example 5: Custom UI Update

```javascript
// Create custom weather display
function displayWeather(weather) {
    const html = `
        <div class="custom-weather">
            <h2>${weather.city}, ${weather.country}</h2>
            <div class="temp">${weather.temperature}${weather.tempUnit}</div>
            <div class="icon">${WeatherAPI.getWeatherEmoji(weather.icon)}</div>
            <div class="desc">${weather.description}</div>
            <div class="details">
                <span>Feels like: ${weather.feelsLike}${weather.tempUnit}</span>
                <span>Humidity: ${weather.humidity}%</span>
                <span>Wind: ${weather.windSpeed} ${weather.speedUnit}</span>
            </div>
        </div>
    `;
    
    document.getElementById('weather-container').innerHTML = html;
}
```

---

## Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Coding Standards

**JavaScript**:
- Use ES6+ features
- Use async/await for asynchronous code
- Add JSDoc comments for functions
- Follow consistent naming conventions
- Use meaningful variable names

**CSS**:
- Use CSS variables for theming
- Follow BEM naming convention (optional)
- Mobile-first approach
- Comment complex selectors

**HTML**:
- Use semantic HTML5 elements
- Add ARIA labels for accessibility
- Validate HTML

### Testing

**Manual Testing Checklist**:
- [ ] Search functionality works
- [ ] Geolocation works
- [ ] Favorites add/remove works
- [ ] Error messages display correctly
- [ ] Loading states show
- [ ] Responsive on mobile
- [ ] Accessible via keyboard
- [ ] Works in all supported browsers

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Support

### Documentation
- **README.md** - Main documentation
- **SETUP.md** - Setup guide
- **FEATURES.md** - Features list
- **API_KEY_GUIDE.md** - API key help

### Links
- **Repository**: https://github.com/Abhishek04-2006/weather
- **Issues**: https://github.com/Abhishek04-2006/weather/issues
- **OpenWeatherMap Docs**: https://openweathermap.org/api

### Contact
For questions or support, please open an issue on GitHub.

---

**Last Updated**: January 11, 2026  
**Version**: 1.0.0  
**Author**: Abhishek04-2006  
**License**: MIT
