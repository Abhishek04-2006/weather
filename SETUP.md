# 🚀 Quick Setup Guide

## Getting Your Weather Dashboard Running in 5 Minutes

### Step 1: Get Your Free API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" (it's free!)
3. Verify your email
4. Go to "API Keys" section
5. Copy your API key

### Step 2: Configure the API Key

1. Open the file `js/api.js` in your text editor
2. Find line 8 where it says:
   ```javascript
   API_KEY: '4f8c0a7c8e1f4b9a8d2c3e5f6a7b8c9d',
   ```
3. Replace the placeholder with your actual API key:
   ```javascript
   API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
   ```
4. Save the file

### Step 3: Run the Application

#### Option A: Simple Double-Click (Easiest)
- Just double-click `index.html`
- Your default browser will open the dashboard
- Done! 🎉

#### Option B: Using a Local Server (Recommended)

**Using Python:**
```bash
# Navigate to the project folder
cd weather-dashboard

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install serve globally (one time only)
npm install -g serve

# Run the server
serve
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

### Step 4: Start Using the Dashboard

1. **Search for a city**: Type any city name and press Enter or click Search
2. **Use your location**: Click the 📍 button to get weather for your current location
3. **Add favorites**: Click the ❤️ icon to save cities to favorites
4. **Quick access**: Click any quick action button for instant weather

## 🔧 Troubleshooting

### "City not found" error
- Check the spelling of the city name
- Try adding the country code (e.g., "London, UK")

### "API key invalid" error
- Make sure you copied the entire API key
- Check that there are no extra spaces
- Wait a few minutes - new API keys can take time to activate

### Weather not loading
- Check your internet connection
- Open browser console (F12) to see detailed errors
- Make sure your API key is activated

### Geolocation not working
- Click "Allow" when browser asks for location permission
- Check that location services are enabled on your device
- Try using HTTPS instead of HTTP

## 📱 Browser Compatibility

Works best on:
- ✅ Chrome/Edge (version 90+)
- ✅ Firefox (version 88+)
- ✅ Safari (version 14+)
- ✅ Opera (version 76+)

## 🎨 Customization Tips

### Change the Color Scheme
Edit `css/styles.css` and modify the CSS variables:
```css
:root {
  --color-primary: hsl(220, 90%, 56%);  /* Change this! */
  --color-secondary: hsl(280, 70%, 60%); /* And this! */
}
```

### Change Default Cities
Edit the quick action buttons in `index.html`:
```html
<button class="quick-action-btn">Your City</button>
```

### Change Temperature Units
The app uses metric (Celsius) by default. To change to imperial (Fahrenheit):
1. Open `js/storage.js`
2. Find the `getUnitPreference()` function
3. Change the default from `'metric'` to `'imperial'`

## 📊 Features Checklist

After setup, try these features:

- [ ] Search for your city
- [ ] Use geolocation
- [ ] Add a city to favorites
- [ ] Click a favorite to view its weather
- [ ] Remove a favorite
- [ ] Try the quick action buttons
- [ ] View the 5-day forecast
- [ ] Check sunrise/sunset times
- [ ] View wind speed and direction

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Open browser console (F12) to see error messages
- Make sure all files are in the correct folders
- Verify your API key is valid and active

## 🎉 You're All Set!

Enjoy your beautiful weather dashboard! Don't forget to:
- ⭐ Star the repository if you found it helpful
- 🐛 Report any bugs you find
- 💡 Suggest new features

---

**Happy Weather Tracking! 🌤️**
