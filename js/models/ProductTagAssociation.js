/**
 * ProductTagAssociation - Represents the association between a product and a tag
 */
class ProductTagAssociation {
    /**
     * @param {Object} data - Product tag association data
     * @param {number} data.tag_id - Tag ID
     * @param {number} data.product_id - Product ID
     */
    constructor(data) {
        this.tagId = data.tag_id;
        this.productId = data.product_id;

        // Reference to Tag object (lazy loaded)
        this.tag = null;

        this.validate();
    }

    /**
     * Validate product tag association data
     */
    validate() {
        if (!this.tagId || typeof this.tagId !== 'number') {
            throw new Error('ProductTagAssociation must have a valid numeric tag_id');
        }
        if (!this.productId || typeof this.productId !== 'number') {
            throw new Error('ProductTagAssociation must have a valid numeric product_id');
        }
    }

    /**
     * Set the tag reference
     * @param {Tag} tag - Tag object
     */
    setTag(tag) {
        this.tag = tag;
    }

    /**
     * Get the tag name
     * @returns {string|null} Tag name or null if not loaded
     */
    getTagName() {
        return this.tag ? this.tag.name : null;
    }

    /**
     * Convert to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            tag_id: this.tagId,
            product_id: this.productId,
            tag_name: this.getTagName()
        };
    }

    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
        return this.getTagName() || `Tag ${this.tagId}`;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductTagAssociation;
}
