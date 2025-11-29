/**
 * JsonLoader - Utility class for loading JSON data files
 */
class JsonLoader {
    /**
     * Load a single JSON file
     * @param {string} path - Path to the JSON file
     * @returns {Promise<any>} Parsed JSON data
     */
    static async loadJson(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading JSON from ${path}:`, error);
            throw error;
        }
    }

    /**
     * Load multiple JSON files in parallel
     * @param {Object<string, string>} paths - Object with keys as data names and values as paths
     * @returns {Promise<Object>} Object with loaded data
     */
    static async loadMultiple(paths) {
        const entries = Object.entries(paths);
        const promises = entries.map(([key, path]) =>
            this.loadJson(path).then(data => ({ key, data }))
        );

        const results = await Promise.all(promises);

        return results.reduce((acc, { key, data }) => {
            acc[key] = data;
            return acc;
        }, {});
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JsonLoader;
}
