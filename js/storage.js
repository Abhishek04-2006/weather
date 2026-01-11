/**
 * LOCAL STORAGE MANAGER
 * Handles all local storage operations for user preferences
 */

const StorageManager = {
  // Storage keys
  KEYS: {
    FAVORITES: 'weather_favorites',
    LAST_SEARCH: 'weather_last_search',
    UNIT_PREFERENCE: 'weather_unit_preference',
    THEME: 'weather_theme'
  },

  /**
   * Get favorites from local storage
   * @returns {Array} Array of favorite cities
   */
  getFavorites() {
    try {
      const favorites = localStorage.getItem(this.KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  /**
   * Add a city to favorites
   * @param {Object} cityData - City data to add
   * @returns {boolean} Success status
   */
  addFavorite(cityData) {
    try {
      const favorites = this.getFavorites();
      
      // Check if already exists
      const exists = favorites.some(fav => 
        fav.name.toLowerCase() === cityData.name.toLowerCase() &&
        fav.country === cityData.country
      );
      
      if (exists) {
        console.log('City already in favorites');
        return false;
      }
      
      // Add to favorites
      favorites.push({
        name: cityData.name,
        country: cityData.country,
        lat: cityData.lat,
        lon: cityData.lon,
        addedAt: new Date().toISOString()
      });
      
      localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  },

  /**
   * Remove a city from favorites
   * @param {string} cityName - Name of city to remove
   * @returns {boolean} Success status
   */
  removeFavorite(cityName) {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(fav => 
        fav.name.toLowerCase() !== cityName.toLowerCase()
      );
      
      localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  },

  /**
   * Check if a city is in favorites
   * @param {string} cityName - Name of city to check
   * @returns {boolean} True if in favorites
   */
  isFavorite(cityName) {
    const favorites = this.getFavorites();
    return favorites.some(fav => 
      fav.name.toLowerCase() === cityName.toLowerCase()
    );
  },

  /**
   * Save last searched city
   * @param {string} cityName - City name to save
   */
  saveLastSearch(cityName) {
    try {
      localStorage.setItem(this.KEYS.LAST_SEARCH, cityName);
    } catch (error) {
      console.error('Error saving last search:', error);
    }
  },

  /**
   * Get last searched city
   * @returns {string|null} Last searched city name
   */
  getLastSearch() {
    try {
      return localStorage.getItem(this.KEYS.LAST_SEARCH);
    } catch (error) {
      console.error('Error getting last search:', error);
      return null;
    }
  },

  /**
   * Save unit preference (metric/imperial)
   * @param {string} unit - Unit preference
   */
  saveUnitPreference(unit) {
    try {
      localStorage.setItem(this.KEYS.UNIT_PREFERENCE, unit);
    } catch (error) {
      console.error('Error saving unit preference:', error);
    }
  },

  /**
   * Get unit preference
   * @returns {string} Unit preference (default: metric)
   */
  getUnitPreference() {
    try {
      return localStorage.getItem(this.KEYS.UNIT_PREFERENCE) || 'metric';
    } catch (error) {
      console.error('Error getting unit preference:', error);
      return 'metric';
    }
  },

  /**
   * Clear all stored data
   */
  clearAll() {
    try {
      Object.values(this.KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      console.log('All storage cleared');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  /**
   * Get storage statistics
   * @returns {Object} Storage stats
   */
  getStats() {
    return {
      favorites: this.getFavorites().length,
      lastSearch: this.getLastSearch(),
      unitPreference: this.getUnitPreference()
    };
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
