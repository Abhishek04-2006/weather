/**
 * WEATHER API MODULE
 * Handles all API calls to OpenWeatherMap
 */

const WeatherAPI = {
    // API Configuration
    API_KEY: '8a64e616ba5a4512fd14c4b5e10d660a', // Get free key from: https://home.openweathermap.org/api_keys
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO_URL: 'https://api.openweathermap.org/geo/1.0',

    /**
     * Get current weather by city name
     * @param {string} city - City name
     * @param {string} units - Units (metric/imperial)
     * @returns {Promise<Object>} Weather data
     */
    async getCurrentWeather(city, units = 'metric') {
        try {
            const url = `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${this.API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 401) {
                    throw new Error('API key invalid. Please check your configuration.');
                } else {
                    throw new Error(`Failed to fetch weather data (${response.status})`);
                }
            }

            const data = await response.json();
            return this.formatCurrentWeather(data, units);
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw error;
        }
    },

    /**
     * Get current weather by coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {string} units - Units (metric/imperial)
     * @returns {Promise<Object>} Weather data
     */
    async getCurrentWeatherByCoords(lat, lon, units = 'metric') {
        try {
            const url = `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${this.API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch weather data (${response.status})`);
            }

            const data = await response.json();
            return this.formatCurrentWeather(data, units);
        } catch (error) {
            console.error('Error fetching weather by coords:', error);
            throw error;
        }
    },

    /**
     * Get 5-day forecast
     * @param {string} city - City name
     * @param {string} units - Units (metric/imperial)
     * @returns {Promise<Array>} Forecast data
     */
    async getForecast(city, units = 'metric') {
        try {
            const url = `${this.BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${this.API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch forecast data (${response.status})`);
            }

            const data = await response.json();
            return this.formatForecast(data, units);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw error;
        }
    },

    /**
     * Get 5-day forecast by coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {string} units - Units (metric/imperial)
     * @returns {Promise<Array>} Forecast data
     */
    async getForecastByCoords(lat, lon, units = 'metric') {
        try {
            const url = `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${this.API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch forecast data (${response.status})`);
            }

            const data = await response.json();
            return this.formatForecast(data, units);
        } catch (error) {
            console.error('Error fetching forecast by coords:', error);
            throw error;
        }
    },

    /**
     * Get coordinates for a city
     * @param {string} city - City name
     * @returns {Promise<Object>} Coordinates and city info
     */
    async getCityCoordinates(city) {
        try {
            const url = `${this.GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${this.API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch city coordinates');
            }

            const data = await response.json();

            if (data.length === 0) {
                throw new Error('City not found');
            }

            return {
                name: data[0].name,
                country: data[0].country,
                lat: data[0].lat,
                lon: data[0].lon
            };
        } catch (error) {
            console.error('Error fetching city coordinates:', error);
            throw error;
        }
    },

    /**
     * Format current weather data
     * @param {Object} data - Raw API data
     * @param {string} units - Units used
     * @returns {Object} Formatted weather data
     */
    formatCurrentWeather(data, units) {
        const tempUnit = units === 'metric' ? '°C' : '°F';
        const speedUnit = units === 'metric' ? 'm/s' : 'mph';

        return {
            city: data.name,
            country: data.sys.country,
            coordinates: {
                lat: data.coord.lat,
                lon: data.coord.lon
            },
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            tempMin: Math.round(data.main.temp_min),
            tempMax: Math.round(data.main.temp_max),
            tempUnit,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            iconCode: data.weather[0].id,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: Math.round(data.wind.speed * 10) / 10,
            windDeg: data.wind.deg,
            speedUnit,
            clouds: data.clouds.all,
            visibility: data.visibility / 1000, // Convert to km
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            timezone: data.timezone,
            timestamp: data.dt
        };
    },

    /**
     * Format forecast data - get one forecast per day at noon
     * @param {Object} data - Raw API data
     * @param {string} units - Units used
     * @returns {Array} Formatted forecast array
     */
    formatForecast(data, units) {
        const tempUnit = units === 'metric' ? '°C' : '°F';
        const dailyForecasts = [];
        const processedDates = new Set();

        // Get one forecast per day (preferably around noon)
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateString = date.toLocaleDateString();

            // Skip if we already have this date
            if (processedDates.has(dateString)) {
                return;
            }

            // Only take forecasts around noon (12:00)
            const hour = date.getHours();
            if (hour >= 11 && hour <= 13) {
                processedDates.add(dateString);

                dailyForecasts.push({
                    date: date,
                    dateString: date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    }),
                    temperature: Math.round(item.main.temp),
                    tempMin: Math.round(item.main.temp_min),
                    tempMax: Math.round(item.main.temp_max),
                    tempUnit,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    iconCode: item.weather[0].id,
                    humidity: item.main.humidity,
                    windSpeed: Math.round(item.wind.speed * 10) / 10,
                    clouds: item.clouds.all,
                    pop: Math.round(item.pop * 100) // Probability of precipitation
                });
            }
        });

        // If we don't have 5 days, fill with available data
        if (dailyForecasts.length < 5) {
            const remainingDays = 5 - dailyForecasts.length;
            const additionalForecasts = data.list
                .filter(item => {
                    const dateString = new Date(item.dt * 1000).toLocaleDateString();
                    return !processedDates.has(dateString);
                })
                .slice(0, remainingDays)
                .map(item => {
                    const date = new Date(item.dt * 1000);
                    return {
                        date: date,
                        dateString: date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        }),
                        temperature: Math.round(item.main.temp),
                        tempMin: Math.round(item.main.temp_min),
                        tempMax: Math.round(item.main.temp_max),
                        tempUnit,
                        description: item.weather[0].description,
                        icon: item.weather[0].icon,
                        iconCode: item.weather[0].id,
                        humidity: item.main.humidity,
                        windSpeed: Math.round(item.wind.speed * 10) / 10,
                        clouds: item.clouds.all,
                        pop: Math.round(item.pop * 100)
                    };
                });

            dailyForecasts.push(...additionalForecasts);
        }

        return dailyForecasts.slice(0, 5);
    },

    /**
     * Get weather icon emoji based on icon code
     * @param {string} iconCode - OpenWeatherMap icon code
     * @returns {string} Weather emoji
     */
    getWeatherEmoji(iconCode) {
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };

        return iconMap[iconCode] || '🌡️';
    },

    /**
     * Get wind direction from degrees
     * @param {number} degrees - Wind direction in degrees
     * @returns {string} Wind direction (N, NE, E, etc.)
     */
    getWindDirection(degrees) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    },

    /**
     * Format timestamp to time string
     * @param {number} timestamp - Unix timestamp
     * @param {number} timezone - Timezone offset in seconds
     * @returns {string} Formatted time
     */
    formatTime(timestamp, timezone) {
        const date = new Date((timestamp + timezone) * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherAPI;
}
