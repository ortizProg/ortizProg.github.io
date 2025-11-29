/**
 * BaseRepository - Base class for all repositories
 * Provides common CRUD operations and data management
 */
class BaseRepository {
    /**
     * @param {string} dataPath - Path to the JSON data file
     * @param {Function} ModelClass - Model class constructor
     */
    constructor(dataPath, ModelClass) {
        this.dataPath = dataPath;
        this.ModelClass = ModelClass;
        this.items = [];
        this.loaded = false;
    }

    /**
     * Load data from JSON file
     * @returns {Promise<void>}
     */
    async load() {
        if (this.loaded) {
            return; // Already loaded
        }

        try {
            const data = await JsonLoader.loadJson(this.dataPath);
            this.items = data.map(item => new this.ModelClass(item));
            this.loaded = true;
            console.log(`✓ Loaded ${this.items.length} items from ${this.dataPath}`);
        } catch (error) {
            console.error(`Error loading ${this.dataPath}:`, error);
            throw error;
        }
    }

    /**
     * Get all items
     * @returns {Array} All items
     */
    getAll() {
        return this.items;
    }

    /**
     * Get item by ID
     * @param {number} id - Item ID
     * @returns {Object|null} Item or null if not found
     */
    getById(id) {
        return this.items.find(item => item.id === id) || null;
    }

    /**
     * Filter items by predicate function
     * @param {Function} predicate - Filter function
     * @returns {Array} Filtered items
     */
    filter(predicate) {
        return this.items.filter(predicate);
    }

    /**
     * Find first item matching predicate
     * @param {Function} predicate - Search function
     * @returns {Object|null} First matching item or null
     */
    find(predicate) {
        return this.items.find(predicate) || null;
    }

    /**
     * Get count of items
     * @returns {number} Number of items
     */
    count() {
        return this.items.length;
    }

    /**
     * Check if repository has been loaded
     * @returns {boolean} True if loaded
     */
    isLoaded() {
        return this.loaded;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseRepository;
}
