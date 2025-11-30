/**
 * Coupon - Represents a discount coupon
 */
export default class Coupon {
    /**
     * @param {Object} data - Coupon data
     * @param {number} data.id - Coupon ID
     * @param {string} data.name - Coupon name
     * @param {number} data.disc_porcent - Discount percentage
     * @param {string} data.code - Coupon code
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.discPorcent = data.disc_porcent;
        this.code = data.code;

        this.validate();
    }

    /**
     * Validate coupon data
     */
    validate() {
        if (!this.id || typeof this.id !== 'number') {
            throw new Error('Coupon must have a valid numeric ID');
        }
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Coupon must have a valid name');
        }
        if (typeof this.discPorcent !== 'number' || this.discPorcent < 0 || this.discPorcent > 100) {
            throw new Error('Coupon must have a valid discount percentage (0-100)');
        }
        if (!this.code || typeof this.code !== 'string') {
            throw new Error('Coupon must have a valid code');
        }
    }

    /**
     * Apply discount to a price
     * @param {number} price - Original price
     * @returns {number} Price after discount
     */
    applyDiscount(price) {
        if (typeof price !== 'number' || price < 0) {
            throw new Error('Invalid price');
        }
        const discount = price * (this.discPorcent / 100);
        return Math.round(price - discount);
    }

    /**
     * Get discount amount for a price
     * @param {number} price - Original price
     * @returns {number} Discount amount
     */
    getDiscountAmount(price) {
        if (typeof price !== 'number' || price < 0) {
            throw new Error('Invalid price');
        }
        return Math.round(price * (this.discPorcent / 100));
    }

    /**
     * Get formatted discount percentage
     * @returns {string} Formatted percentage (e.g., "10%")
     */
    getFormattedDiscount() {
        return `${this.discPorcent}%`;
    }

    /**
     * Check if code matches (case-insensitive)
     * @param {string} code - Code to check
     * @returns {boolean} True if code matches
     */
    isValid(code) {
        return this.code.toLowerCase() === code.toLowerCase();
    }

    /**
     * Convert to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            disc_porcent: this.discPorcent,
            code: this.code,
            formatted_discount: this.getFormattedDiscount()
        };
    }

    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
        return `${this.name} (${this.code}) - ${this.getFormattedDiscount()}`;
    }
}
