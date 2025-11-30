/**
 * ProductImage - Represents a product image
 */
export default class ProductImage {
    /**
     * @param {Object} data - Product image data
     * @param {number} data.product_id - Product ID
     * @param {string} data.image - Image URL
     * @param {number} data.order - Display order
     */
    constructor(data) {
        this.productId = data.product_id;
        this.image = data.image;
        this.order = data.order;

        this.validate();
    }

    /**
     * Validate product image data
     */
    validate() {
        if (!this.productId || typeof this.productId !== 'number') {
            throw new Error('ProductImage must have a valid numeric product_id');
        }
        if (!this.image || typeof this.image !== 'string') {
            throw new Error('ProductImage must have a valid image URL');
        }
        if (typeof this.order !== 'number') {
            throw new Error('ProductImage must have a valid numeric order');
        }
    }

    /**
     * Get clean image URL (removes "url:" prefix if present)
     * @returns {string} Clean image URL
     */
    getImageUrl() {
        return this.image.replace(/^url:/, '');
    }

    /**
     * Convert to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            product_id: this.productId,
            image: this.image,
            order: this.order,
            url: this.getImageUrl()
        };
    }

    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
        return `Image #${this.order}: ${this.getImageUrl()}`;
    }
}