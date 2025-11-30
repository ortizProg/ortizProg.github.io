/**
 * Brand - Represents a product brand
 */
export default class Brand {
    /**
     * @param {Object} data - Brand data
     * @param {number} data.id - Brand ID
     * @param {string} data.name - Brand name
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;

        this.validate();
    }

    /**
     * Validate brand data
     */
    validate() {
        if (!this.id || typeof this.id !== 'number') {
            throw new Error('Brand must have a valid numeric ID');
        }
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Brand must have a valid name');
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