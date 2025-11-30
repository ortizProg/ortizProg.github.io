/**
 * Specification - Represents a type of specification (e.g., "Peso", "Voltaje")
 */
export default class Specification {
    /**
     * @param {Object} data - Specification data
     * @param {number} data.id - Specification ID
     * @param {string} data.name - Specification name
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;

        this.validate();
    }

    /**
     * Validate specification data
     */
    validate() {
        if (!this.id || typeof this.id !== 'number') {
            throw new Error('Specification must have a valid numeric ID');
        }
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Specification must have a valid name');
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