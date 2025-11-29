/**
 * Tag - Represents a product tag
 */
class Tag {
    /**
     * @param {Object} data - Tag data
     * @param {number} data.id - Tag ID
     * @param {string} data.name - Tag name
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;

        this.validate();
    }

    /**
     * Validate tag data
     */
    validate() {
        if (!this.id || typeof this.id !== 'number') {
            throw new Error('Tag must have a valid numeric ID');
        }
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Tag must have a valid name');
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
    module.exports = Tag;
}
