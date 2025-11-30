/**
 * Product - Represents a product with all its properties and relationships
 */
export default class Product {
    /**
     * @param {Object} data - Product data
     * @param {number} data.id - Product ID
     * @param {string} data.name - Product name
     * @param {string} data.description - Product description
     * @param {string} data.image - Main product image URL
     * @param {number} data.score - Product rating (0-5)
     * @param {number} data.category_id - Category ID
     * @param {number} data.brand_id - Brand ID
     * @param {number} data.price - Product price
     * @param {number} data.stock - Available stock
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.score = data.score;
        this.categoryId = data.category_id;
        this.brandId = data.brand_id;
        this.price = data.price;
        this.stock = data.stock;

        // Relationships (lazy loaded)
        this.category = null;
        this.brand = null;
        this.images = [];
        this.specifications = [];
        this.tags = [];

        this.validate();
    }

    /**
     * Validate product data
     */
    validate() {
        if (!this.id || typeof this.id !== 'number') {
            throw new Error('Product must have a valid numeric ID');
        }
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Product must have a valid name');
        }
        if (typeof this.price !== 'number' || this.price < 0) {
            throw new Error('Product must have a valid price');
        }
        if (typeof this.stock !== 'number' || this.stock < 0) {
            throw new Error('Product must have a valid stock');
        }
    }

    /**
     * Set category reference
     * @param {Category} category - Category object
     */
    setCategory(category) {
        this.category = category;
    }

    /**
     * Set brand reference
     * @param {Brand} brand - Brand object
     */
    setBrand(brand) {
        this.brand = brand;
    }

    /**
     * Set product images
     * @param {ProductImage[]} images - Array of ProductImage objects
     */
    setImages(images) {
        this.images = images.sort((a, b) => a.order - b.order);
    }

    /**
     * Set product specifications
     * @param {ProductSpecification[]} specifications - Array of ProductSpecification objects
     */
    setSpecifications(specifications) {
        this.specifications = specifications;
    }

    /**
     * Set product tags
     * @param {Tag[]} tags - Array of Tag objects
     */
    setTags(tags) {
        this.tags = tags;
    }

    /**
     * Get category name
     * @returns {string|null} Category name or null if not loaded
     */
    getCategoryName() {
        return this.category ? this.category.name : null;
    }

    /**
     * Get brand name
     * @returns {string|null} Brand name or null if not loaded
     */
    getBrandName() {
        return this.brand ? this.brand.name : null;
    }

    /**
     * Get formatted price in Colombian pesos
     * @returns {string} Formatted price
     */
    getFormattedPrice() {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(this.price);
    }

    /**
     * Check if product is in stock
     * @returns {boolean} True if in stock
     */
    isInStock() {
        return this.stock > 0;
    }

    /**
     * Check if product has a specific tag
     * @param {string} tagName - Tag name to check
     * @returns {boolean} True if product has the tag
     */
    hasTag(tagName) {
        return this.tags.some(tag =>
            tag.name.toLowerCase() === tagName.toLowerCase()
        );
    }

    /**
     * Get main product image
     * @returns {string} Main image URL
     */
    getMainImage() {
        if (this.images.length > 0) {
            return this.images[0].getImageUrl();
        }
        return this.image ? this.image.replace(/^url:/, '') : '';
    }

    /**
     * Get all product images
     * @returns {string[]} Array of image URLs
     */
    getAllImages() {
        if (this.images.length > 0) {
            return this.images.map(img => img.getImageUrl());
        }
        return this.image ? [this.image.replace(/^url:/, '')] : [];
    }

    /**
     * Get specification value by name
     * @param {string} specName - Specification name
     * @returns {string|null} Specification value or null if not found
     */
    getSpecificationValue(specName) {
        const spec = this.specifications.find(s =>
            s.getSpecificationName() === specName
        );
        return spec ? spec.value : null;
    }

    /**
     * Get all specifications as key-value object
     * @returns {Object} Object with specification names as keys and values
     */
    getSpecificationsObject() {
        return this.specifications.reduce((obj, spec) => {
            const name = spec.getSpecificationName();
            if (name) {
                obj[name] = spec.value;
            }
            return obj;
        }, {});
    }

    /**
     * Get star rating HTML
     * @returns {string} HTML string for star rating
     */
    getStarRatingHTML() {
        const fullStars = Math.floor(this.score);
        const hasHalfStar = this.score % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let html = '';
        for (let i = 0; i < fullStars; i++) {
            html += '★';
        }
        if (hasHalfStar) {
            html += '⯨';
        }
        for (let i = 0; i < emptyStars; i++) {
            html += '☆';
        }
        return html;
    }

    /**
     * Convert to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            image: this.image,
            score: this.score,
            category_id: this.categoryId,
            brand_id: this.brandId,
            price: this.price,
            stock: this.stock,
            formatted_price: this.getFormattedPrice(),
            category_name: this.getCategoryName(),
            brand_name: this.getBrandName(),
            in_stock: this.isInStock(),
            main_image: this.getMainImage(),
            all_images: this.getAllImages(),
            tags: this.tags.map(t => t.toJSON()),
            specifications: this.getSpecificationsObject()
        };
    }

    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
        return `${this.name} - ${this.getFormattedPrice()}`;
    }
}
