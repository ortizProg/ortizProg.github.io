/**
 * ProductSpecification - Represents a specific specification value for a product
 */
export default class ProductSpecification {
    /**
     * @param {Object} data - Product specification data
     * @param {number} data.product_id - Product ID
     * @param {number} data.specification_id - Specification ID
     * @param {string} data.value - Specification value
     */
    constructor(data) {
        this.productId = data.product_id;
        this.specificationId = data.specification_id;
        this.value = data.value;

        // Reference to Specification object (lazy loaded)
        this.specification = null;

        this.validate();
    }

    /**
     * Validate product specification data
     */
    validate() {
        if (!this.productId || typeof this.productId !== 'number') {
            throw new Error('ProductSpecification must have a valid numeric product_id');
        }
        if (!this.specificationId || typeof this.specificationId !== 'number') {
            throw new Error('ProductSpecification must have a valid numeric specification_id');
        }
        if (this.value === undefined || this.value === null) {
            throw new Error('ProductSpecification must have a value');
        }
    }

    /**
     * Set the specification reference
     * @param {Specification} specification - Specification object
     */
    setSpecification(specification) {
        this.specification = specification;
    }

    /**
     * Get the specification name
     * @returns {string|null} Specification name or null if not loaded
     */
    getSpecificationName() {
        return this.specification ? this.specification.name : null;
    }

    /**
     * Convert to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            product_id: this.productId,
            specification_id: this.specificationId,
            value: this.value,
            specification_name: this.getSpecificationName()
        };
    }

    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
        const name = this.getSpecificationName() || `Spec ${this.specificationId}`;
        return `${name}: ${this.value}`;
    }
}