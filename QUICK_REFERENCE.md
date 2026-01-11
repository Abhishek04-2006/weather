# 📖 Weather Dashboard - Quick Reference Guide

## 🚀 Quick Start

### 1. Get API Key
```
1. Visit: https://openweathermap.org/api
2. Sign up (free)
3. Get API key from: https://home.openweathermap.org/api_keys
```

### 2. Configure
```javascript
// Edit js/api.js line 8
API_KEY: 'your_api_key_here',
```

### 3. Run
```bash
# Open index.html in browser
# Or use local server:
python -m http.server 8000
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Project overview and features |
| **DOCUMENTATION.md** | Complete technical documentation |
| **SETUP.md** | Quick setup guide |
| **API_KEY_GUIDE.md** | API key setup help |
| **FEATURES.md** | Detailed features list |
| **CHECKLIST.md** | Deployment checklist |
| **PROJECT_SUMMARY.md** | Project statistics |
| **GITHUB_SETUP.md** | GitHub deployment |
| **SUBMISSION_COMPLETE.md** | Submission summary |

---

## 🔑 Key Functions

### Search Weather
```javascript
// Search by city name
await WeatherAPI.getCurrentWeather('London', 'metric');
await WeatherAPI.getForecast('London', 'metric');

// Search by coordinates
await WeatherAPI.getCurrentWeatherByCoords(51.5074, -0.1278, 'metric');
```

### Manage Favorites
```javascript
// Add favorite
StorageManager.addFavorite({
    name: 'London',
    country: 'GB',
    lat: 51.5074,
    lon: -0.1278
});

// Check if favorite
StorageManager.isFavorite('London'); // true/false

// Get all favorites
StorageManager.getFavorites(); // Array

// Remove favorite
StorageManager.removeFavorite('London');
```

### Storage Operations
```javascript
// Save last search
StorageManager.saveLastSearch('London');

// Get last search
StorageManager.getLastSearch(); // 'London'

// Get unit preference
StorageManager.getUnitPreference(); // 'metric' or 'imperial'
```

---

## 🎨 CSS Classes

### Buttons
```css
.btn                    /* Primary button */
.btn-secondary          /* Secondary button */
.btn-icon              /* Icon button */
.quick-action-btn      /* Quick action button */
```

### Cards
```css
.weather-card          /* Main weather card */
.forecast-card         /* Forecast card */
.favorite-card         /* Favorite city card */
```

### Layout
```css
.container             /* Main container */
.search-section        /* Search area */
.weather-grid          /* Weather grid layout */
.forecast-grid         /* Forecast grid */
```

### States
```css
.hidden                /* Hide element */
.active                /* Active state */
.fade-in               /* Fade in animation */
```

---

## 🔧 Configuration

### Change Default City
```javascript
// js/app.js, line 76
async loadInitialData() {
    this.renderFavorites();
    await this.searchWeather('London'); // Change city here
}
```

### Change Units
```javascript
// js/storage.js, line 116
getUnitPreference() {
    return 'imperial'; // or 'metric'
}
```

### Change Colors
```css
/* css/styles.css, line 18 */
:root {
    --color-primary: hsl(220, 90%, 56%);  /* Change this */
    --color-secondary: hsl(280, 70%, 60%); /* And this */
}
```

---

## ⚡ Common Tasks

### Add New Quick Action City
```html
<!-- index.html, line 70 -->
<button class="quick-action-btn">Your City</button>
```

### Customize Loading Message
```javascript
// js/app.js, line 315
showLoading(message = 'Your custom message...') {
    // ...
}
```

### Change Auto-Hide Error Time
```javascript
// js/app.js, line 343
setTimeout(() => {
    this.hideError();
}, 5000); // Change 5000 to desired milliseconds
```

---

## 🐛 Troubleshooting

### API Key Not Working
```
✓ Wait 10-15 minutes for activation
✓ Check key is 32 characters
✓ Verify email is confirmed
✓ Ensure it's OpenWeatherMap key (not Google)
```

### City Not Found
```
✓ Check spelling
✓ Try: "London, UK" (with country)
✓ Use English names
✓ Try major cities first
```

### Geolocation Not Working
```
✓ Use HTTPS (required)
✓ Allow browser permission
✓ Enable device location
✓ Try different browser
```

### Favorites Not Saving
```
✓ Not in incognito mode
✓ Local storage enabled
✓ Clear browser cache
✓ Check storage quota
```

---

## 📊 API Endpoints

### Current Weather
```
GET https://api.openweathermap.org/data/2.5/weather
Parameters: q, units, appid
```

### 5-Day Forecast
```
GET https://api.openweathermap.org/data/2.5/forecast
Parameters: q, units, appid
```

### Geocoding
```
GET https://api.openweathermap.org/geo/1.0/direct
Parameters: q, limit, appid
```

---

## 🎯 File Structure

```
weather-dashboard/
├── index.html              # Main HTML
├── css/
│   └── styles.css         # All styles
├── js/
│   ├── api.js            # API module
│   ├── storage.js        # Storage module
│   └── app.js            # Main app
├── screenshots/          # 5 images
└── docs/                 # 9 documentation files
```

---

## 🌐 Useful Links

- **Repository**: https://github.com/Abhishek04-2006/weather
- **OpenWeatherMap**: https://openweathermap.org/api
- **API Docs**: https://openweathermap.org/current
- **GitHub Pages**: https://pages.github.com/

---

## 💡 Tips

### Performance
- Use Promise.all() for parallel requests
- Cache results in memory
- Debounce search input
- Lazy load favorites weather

### Best Practices
- Always validate user input
- Handle all error cases
- Provide loading feedback
- Save user preferences
- Use semantic HTML
- Add ARIA labels

### Security
- Don't commit API keys (use .env in production)
- Validate all inputs
- Sanitize user data
- Use HTTPS in production

---

## 📝 Quick Commands

### Git Commands
```bash
git status                  # Check status
git add .                   # Stage all files
git commit -m "message"     # Commit changes
git push                    # Push to GitHub
```

### Local Server
```bash
python -m http.server 8000  # Python
npx serve                   # Node.js
php -S localhost:8000       # PHP
```

### Browser Console
```javascript
// Test API
await WeatherAPI.getCurrentWeather('London', 'metric')

// Check favorites
StorageManager.getFavorites()

// Clear storage
StorageManager.clearAll()
```

---

## 🎓 Learning Resources

### JavaScript
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

### APIs
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### CSS
- [CSS Tricks](https://css-tricks.com/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## ✅ Checklist

### Before Deployment
- [ ] API key configured
- [ ] Tested on multiple browsers
- [ ] Tested on mobile
- [ ] All features working
- [ ] No console errors
- [ ] Documentation updated

### After Deployment
- [ ] GitHub Pages enabled
- [ ] Repository topics added
- [ ] README displays correctly
- [ ] Live site works
- [ ] Shared on portfolio

---

**Quick Reference Version 1.0**  
**Last Updated**: January 11, 2026  
**For full documentation, see**: DOCUMENTATION.md
