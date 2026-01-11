# 🔑 Getting Your OpenWeatherMap API Key

## ⚠️ Important: You Need an OpenWeatherMap API Key (NOT Google API Key)

The weather dashboard uses **OpenWeatherMap API**, which is different from Google APIs.

### ❌ Wrong API Key Type
- Google Cloud API keys (starts with `AIza...`)
- Google Maps API keys
- Any other API service

### ✅ Correct API Key Type
- OpenWeatherMap API key (32 characters: letters and numbers)
- Example format: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## 📋 Step-by-Step Guide to Get Your FREE API Key

### Step 1: Sign Up for OpenWeatherMap

1. **Go to**: [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up)

2. **Fill in the form**:
   - Username
   - Email address
   - Password
   - Confirm password
   - Check "I am 16 years old and over"
   - Check "I agree with Privacy Policy..."
   - Complete the CAPTCHA

3. **Click "Create Account"**

### Step 2: Verify Your Email

1. **Check your email inbox** (the email you used to sign up)
2. **Look for email** from OpenWeatherMap
3. **Click the verification link** in the email
4. **Wait for confirmation** that your account is activated

### Step 3: Get Your API Key

1. **Log in** to OpenWeatherMap: [https://home.openweathermap.org/](https://home.openweathermap.org/)

2. **Go to API Keys page**: [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)

3. **Find your default API key** - It's automatically created when you sign up
   - It will be labeled "Default"
   - It looks like: `852a1b2c3d4e5f6g7h8i9j0k1l2m3n4`

4. **Copy the API key** - Click the copy icon or select and copy

### Step 4: Add API Key to Your Project

1. **Open the file**: `js/api.js` in your text editor

2. **Find line 8** which currently says:
   ```javascript
   API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY_HERE',
   ```

3. **Replace** `YOUR_OPENWEATHERMAP_API_KEY_HERE` with your actual API key:
   ```javascript
   API_KEY: '852a1b2c3d4e5f6g7h8i9j0k1l2m3n4',
   ```
   *(Use your actual key, not this example)*

4. **Save the file** (Ctrl+S or Cmd+S)

### Step 5: Test Your Application

1. **Refresh your browser** (F5 or Ctrl+R)
2. **Search for a city** (e.g., "London")
3. **Weather should load!** ✅

---

## ⏱️ Important: API Key Activation Time

**New API keys can take 10 minutes to 2 hours to activate!**

If you just created your account:
- ⏰ **Wait 10-15 minutes** before testing
- 🔄 **Try again** if it doesn't work immediately
- ✅ **Check email** for activation confirmation

---

## 🧪 Testing Your API Key

### Quick Test in Browser

1. **Replace `YOUR_API_KEY`** in this URL with your actual key:
   ```
   https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY
   ```

2. **Paste the URL** in your browser

3. **Expected Results**:
   - ✅ **Success**: You see JSON data with weather information
   - ❌ **Error 401**: API key is invalid or not activated yet
   - ❌ **Error 404**: Wrong endpoint (shouldn't happen with this URL)

### Example Success Response:
```json
{
  "coord": {"lon": -0.1257, "lat": 51.5085},
  "weather": [{"id": 800, "main": "Clear", "description": "clear sky"}],
  "main": {"temp": 15.5, "feels_like": 14.2},
  ...
}
```

---

## 🆘 Troubleshooting

### Problem: "Invalid API key" Error

**Solutions**:
1. ✅ Make sure you copied the **entire API key** (32 characters)
2. ✅ Check for **extra spaces** before or after the key
3. ✅ Verify you're using **OpenWeatherMap key**, not Google
4. ✅ **Wait 10-15 minutes** if you just created the account
5. ✅ Check the **API Keys page** to see if key is active

### Problem: "City not found" Error

**Solutions**:
1. ✅ Check the **spelling** of the city name
2. ✅ Try adding **country code**: "London, UK"
3. ✅ Try a **major city**: "New York", "Tokyo", "Paris"

### Problem: Weather Still Not Loading

**Solutions**:
1. ✅ **Clear browser cache** (Ctrl+Shift+Delete)
2. ✅ **Hard refresh** (Ctrl+F5)
3. ✅ **Check browser console** (F12) for errors
4. ✅ Verify the file was **saved** after editing
5. ✅ Make sure you edited the **correct file**: `js/api.js`

---

## 📊 Free Tier Limits

OpenWeatherMap free tier includes:
- ✅ **60 calls per minute**
- ✅ **1,000,000 calls per month**
- ✅ **Current weather data**
- ✅ **5-day forecast**
- ✅ **Unlimited cities**

This is **more than enough** for personal use and testing!

---

## 🔒 Security Note

**Important**: Your API key will be visible in the browser since this is a client-side application. For production apps, you should:
- Use environment variables
- Implement a backend proxy
- Restrict API key usage by domain

For learning and personal projects, the current setup is fine!

---

## ✅ Checklist

- [ ] Signed up for OpenWeatherMap account
- [ ] Verified email address
- [ ] Logged into OpenWeatherMap
- [ ] Found API key on API Keys page
- [ ] Copied the entire API key (32 characters)
- [ ] Opened `js/api.js` file
- [ ] Replaced placeholder with actual API key
- [ ] Saved the file
- [ ] Waited 10-15 minutes (if new account)
- [ ] Refreshed browser
- [ ] Tested by searching for a city
- [ ] Weather data loads successfully! 🎉

---

## 📞 Need More Help?

If you're still having issues:

1. **Check the browser console** (F12 → Console tab)
2. **Look for error messages**
3. **Share the error** message for specific help

Common error codes:
- **401**: Invalid or inactive API key
- **404**: City not found
- **429**: Too many requests (rate limit)
- **500**: OpenWeatherMap server error

---

**Good luck! Your weather dashboard will be working soon! 🌤️**
