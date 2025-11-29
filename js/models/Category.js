/**
 * Category - Represents a product category
 */
class Category {
    /**
     * @param {Object} data - Category data
     * @param {number} data.id - Category ID
     * @param {string} data.name - Category name
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;

        this.validate();
    }

    /**
     * Validate category data
     */
    validate() {
        if (!this.id || typeof this.id !== 'number') {
            throw new Error('Category must have a valid numeric ID');
        }
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Category must have a valid name');
        }
    }

    /**
     * Convert to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }

    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
        return this.name;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Category;
}
