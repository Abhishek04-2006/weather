/**
 * WEATHER DASHBOARD - MAIN APPLICATION
 * Coordinates all functionality and UI updates
 */

class WeatherDashboard {
    constructor() {
        this.currentWeather = null;
        this.forecast = null;
        this.units = StorageManager.getUnitPreference();

        this.initializeElements();
        this.attachEventListeners();
        this.loadInitialData();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // Search elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');

        // Weather display elements
        this.currentWeatherSection = document.getElementById('currentWeather');
        this.forecastSection = document.getElementById('forecastSection');
        this.favoritesSection = document.getElementById('favoritesSection');

        // Loading and error elements
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.errorContainer = document.getElementById('errorContainer');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Geolocation
        this.locationBtn.addEventListener('click', () => this.handleGeolocation());

        // Quick action buttons
        const quickActions = document.querySelectorAll('.quick-action-btn');
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const city = btn.textContent.trim();
                this.searchInput.value = city;
                this.handleSearch();
            });
        });
    }

    /**
     * Load initial data on page load
     */
    async loadInitialData() {
        // Load favorites
        this.renderFavorites();

        // Try to load last searched city
        const lastSearch = StorageManager.getLastSearch();
        if (lastSearch) {
            this.searchInput.value = lastSearch;
            await this.searchWeather(lastSearch);
        } else {
            // Try geolocation as fallback
            this.handleGeolocation();
        }
    }

    /**
     * Handle search button click
     */
    async handleSearch() {
        const city = this.searchInput.value.trim();

        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        await this.searchWeather(city);
    }

    /**
     * Search weather for a city
     * @param {string} city - City name
     */
    async searchWeather(city) {
        try {
            this.showLoading();
            this.hideError();

            // Fetch current weather and forecast
            const [currentWeather, forecast] = await Promise.all([
                WeatherAPI.getCurrentWeather(city, this.units),
                WeatherAPI.getForecast(city, this.units)
            ]);

            this.currentWeather = currentWeather;
            this.forecast = forecast;

            // Save to local storage
            StorageManager.saveLastSearch(city);

            // Render data
            this.renderCurrentWeather();
            this.renderForecast();

            this.hideLoading();
        } catch (error) {
            this.hideLoading();
            this.showError(error.message || 'Failed to fetch weather data');
            console.error('Search error:', error);
        }
    }

    /**
     * Handle geolocation button click
     */
    handleGeolocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        this.showLoading('Getting your location...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // Fetch weather by coordinates
                    const [currentWeather, forecast] = await Promise.all([
                        WeatherAPI.getCurrentWeatherByCoords(latitude, longitude, this.units),
                        WeatherAPI.getForecastByCoords(latitude, longitude, this.units)
                    ]);

                    this.currentWeather = currentWeather;
                    this.forecast = forecast;

                    // Update search input
                    this.searchInput.value = currentWeather.city;
                    StorageManager.saveLastSearch(currentWeather.city);

                    // Render data
                    this.renderCurrentWeather();
                    this.renderForecast();

                    this.hideLoading();
                } catch (error) {
                    this.hideLoading();
                    this.showError('Failed to fetch weather for your location');
                    console.error('Geolocation weather error:', error);
                }
            },
            (error) => {
                this.hideLoading();
                let errorMessage = 'Failed to get your location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }

                this.showError(errorMessage);
            }
        );
    }

    /**
     * Render current weather
     */
    renderCurrentWeather() {
        if (!this.currentWeather) return;

        const weather = this.currentWeather;
        const isFavorite = StorageManager.isFavorite(weather.city);

        const html = `
      <div class="weather-card current-weather fade-in">
        <div class="weather-header">
          <div class="location-info">
            <h2>${weather.city}, ${weather.country}</h2>
            <p class="date">${new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</p>
          </div>
          <button 
            class="favorite-btn ${isFavorite ? 'active' : ''}" 
            onclick="app.toggleFavorite()"
            aria-label="Toggle favorite"
          >
            ${isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div class="weather-main">
          <div class="temperature-display">
            <div class="weather-icon-large">
              ${WeatherAPI.getWeatherEmoji(weather.icon)}
            </div>
            <div class="temperature">${weather.temperature}${weather.tempUnit}</div>
            <div class="weather-description">${weather.description}</div>
          </div>
          
          <div class="weather-details">
            <div class="detail-item">
              <span class="detail-icon">🌡️</span>
              <div class="detail-content">
                <span class="label">Feels Like</span>
                <span class="value">${weather.feelsLike}${weather.tempUnit}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">💧</span>
              <div class="detail-content">
                <span class="label">Humidity</span>
                <span class="value">${weather.humidity}%</span>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">💨</span>
              <div class="detail-content">
                <span class="label">Wind Speed</span>
                <span class="value">${weather.windSpeed} ${weather.speedUnit}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">🧭</span>
              <div class="detail-content">
                <span class="label">Wind Direction</span>
                <span class="value">${WeatherAPI.getWindDirection(weather.windDeg)}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">📊</span>
              <div class="detail-content">
                <span class="label">Pressure</span>
                <span class="value">${weather.pressure} hPa</span>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">👁️</span>
              <div class="detail-content">
                <span class="label">Visibility</span>
                <span class="value">${weather.visibility} km</span>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">🌅</span>
              <div class="detail-content">
                <span class="label">Sunrise</span>
                <span class="value">${WeatherAPI.formatTime(weather.sunrise, weather.timezone)}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <span class="detail-icon">🌇</span>
              <div class="detail-content">
                <span class="label">Sunset</span>
                <span class="value">${WeatherAPI.formatTime(weather.sunset, weather.timezone)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

        this.currentWeatherSection.innerHTML = html;
        this.currentWeatherSection.classList.remove('hidden');
    }

    /**
     * Render forecast
     */
    renderForecast() {
        if (!this.forecast || this.forecast.length === 0) return;

        const forecastCards = this.forecast.map(day => `
      <div class="forecast-card fade-in">
        <div class="forecast-date">${day.dateString}</div>
        <div class="forecast-icon">${WeatherAPI.getWeatherEmoji(day.icon)}</div>
        <div class="forecast-temp">${day.temperature}${day.tempUnit}</div>
        <div class="temp-range">
          ${day.tempMin}° / ${day.tempMax}°
        </div>
        <div class="forecast-desc">${day.description}</div>
      </div>
    `).join('');

        const html = `
      <h2 class="section-title">
        <span class="section-icon">📅</span>
        5-Day Forecast
      </h2>
      <div class="forecast-grid">
        ${forecastCards}
      </div>
    `;

        this.forecastSection.innerHTML = html;
        this.forecastSection.classList.remove('hidden');
    }

    /**
     * Toggle favorite status for current city
     */
    async toggleFavorite() {
        if (!this.currentWeather) return;

        const cityData = {
            name: this.currentWeather.city,
            country: this.currentWeather.country,
            lat: this.currentWeather.coordinates.lat,
            lon: this.currentWeather.coordinates.lon
        };

        const isFavorite = StorageManager.isFavorite(cityData.name);

        if (isFavorite) {
            StorageManager.removeFavorite(cityData.name);
        } else {
            StorageManager.addFavorite(cityData);
        }

        // Re-render current weather and favorites
        this.renderCurrentWeather();
        this.renderFavorites();
    }

    /**
     * Render favorites section
     */
    renderFavorites() {
        const favorites = StorageManager.getFavorites();

        if (favorites.length === 0) {
            this.favoritesSection.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">⭐</div>
          <h3>No Favorite Cities Yet</h3>
          <p>Search for a city and click the heart icon to add it to favorites</p>
        </div>
      `;
            this.favoritesSection.classList.remove('hidden');
            return;
        }

        const favoriteCards = favorites.map(fav => `
      <div class="favorite-card" onclick="app.loadFavorite('${fav.name}')">
        <div class="favorite-header">
          <div class="favorite-city">${fav.name}</div>
          <button 
            class="remove-favorite" 
            onclick="event.stopPropagation(); app.removeFavorite('${fav.name}')"
            aria-label="Remove from favorites"
          >
            ✕
          </button>
        </div>
        <div class="favorite-weather">
          <div class="favorite-icon">🌤️</div>
          <div class="favorite-temp">--°</div>
        </div>
      </div>
    `).join('');

        const html = `
      <h2 class="section-title">
        <span class="section-icon">⭐</span>
        Favorite Cities
      </h2>
      <div class="favorites-grid">
        ${favoriteCards}
      </div>
    `;

        this.favoritesSection.innerHTML = html;
        this.favoritesSection.classList.remove('hidden');

        // Load weather for favorites in background
        this.loadFavoritesWeather(favorites);
    }

    /**
     * Load weather for favorite cities
     * @param {Array} favorites - Array of favorite cities
     */
    async loadFavoritesWeather(favorites) {
        for (const fav of favorites) {
            try {
                const weather = await WeatherAPI.getCurrentWeatherByCoords(
                    fav.lat,
                    fav.lon,
                    this.units
                );

                // Update the favorite card
                const cards = document.querySelectorAll('.favorite-card');
                cards.forEach(card => {
                    if (card.textContent.includes(fav.name)) {
                        const iconEl = card.querySelector('.favorite-icon');
                        const tempEl = card.querySelector('.favorite-temp');

                        if (iconEl && tempEl) {
                            iconEl.textContent = WeatherAPI.getWeatherEmoji(weather.icon);
                            tempEl.textContent = `${weather.temperature}${weather.tempUnit}`;
                        }
                    }
                });
            } catch (error) {
                console.error(`Failed to load weather for ${fav.name}:`, error);
            }
        }
    }

    /**
     * Load weather for a favorite city
     * @param {string} cityName - City name
     */
    async loadFavorite(cityName) {
        this.searchInput.value = cityName;
        await this.searchWeather(cityName);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Remove a city from favorites
     * @param {string} cityName - City name
     */
    removeFavorite(cityName) {
        StorageManager.removeFavorite(cityName);
        this.renderFavorites();

        // Update current weather display if it's the removed city
        if (this.currentWeather && this.currentWeather.city === cityName) {
            this.renderCurrentWeather();
        }
    }

    /**
     * Show loading overlay
     * @param {string} message - Loading message
     */
    showLoading(message = 'Loading weather data...') {
        const loadingText = this.loadingOverlay.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = message;
        }
        this.loadingOverlay.classList.add('active');
    }

    /**
     * Hide loading overlay
     */
    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
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
        this.errorContainer.classList.remove('hidden');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorContainer.classList.add('hidden');
        this.errorContainer.innerHTML = '';
    }
}

// Initialize app when DOM is ready
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new WeatherDashboard();
    console.log('Weather Dashboard initialized');
});
