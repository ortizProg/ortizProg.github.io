/**
 * StaticDataManager - Version for static sites (no backend required)
 * Uses inline data instead of fetch() to work without a server
 */
class StaticDataManager {
    constructor() {
        // Initialize empty repositories (will be populated from inline data)
        this.categoriesData = [];
        this.brandsData = [];
        this.tagsData = [];
        this.specificationsData = [];
        this.productsData = [];
        this.couponsData = [];
        this.productImages = [];
        this.productSpecifications = [];
        this.productTagAssos = [];

        this.initialized = false;
    }

    /**
     * Initialize with inline data (no fetch required)
     * @param {Object} inlineData - Data object from InlineData.js
     */
    initialize(inlineData) {
        if (this.initialized) {
            console.log('⚠ StaticDataManager already initialized');
            return;
        }

        console.log('🔄 Initializing StaticDataManager with inline data...');

        try {
            // Create model instances from inline data
            this.categoriesData = inlineData.categories.map(d => new Category(d));
            this.brandsData = inlineData.brands.map(d => new Brand(d));
            this.tagsData = inlineData.tags.map(d => new Tag(d));
            this.specificationsData = inlineData.specifications.map(d => new Specification(d));
            this.productsData = inlineData.products.map(d => new Product(d));
            this.couponsData = inlineData.coupons.map(d => new Coupon(d));

            // Create relationship objects
            this.productImages = inlineData.productImages.map(d => new ProductImage(d));
            this.productSpecifications = inlineData.productSpecifications.map(d => new ProductSpecification(d));
            this.productTagAssos = inlineData.productTagAssos.map(d => new ProductTagAssociation(d));

            console.log(`✓ Loaded ${this.categoriesData.length} categories`);
            console.log(`✓ Loaded ${this.brandsData.length} brands`);
            console.log(`✓ Loaded ${this.tagsData.length} tags`);
            console.log(`✓ Loaded ${this.specificationsData.length} specifications`);
            console.log(`✓ Loaded ${this.productsData.length} products`);
            console.log(`✓ Loaded ${this.couponsData.length} coupons`);
            console.log(`✓ Loaded ${this.productImages.length} product images`);
            console.log(`✓ Loaded ${this.productSpecifications.length} product specifications`);
            console.log(`✓ Loaded ${this.productTagAssos.length} product-tag associations`);

            // Enrich all products with relationships
            this.enrichAllProducts();

            this.initialized = true;
            console.log('✅ StaticDataManager initialized successfully!');

        } catch (error) {
            console.error('❌ Error initializing StaticDataManager:', error);
            throw error;
        }
    }

    /**
     * Enrich all products with their relationships
     */
    enrichAllProducts() {
        this.productsData.forEach(product => this.enrichProduct(product));
        console.log(`✓ Enriched ${this.productsData.length} products with relationships`);
    }

    /**
     * Enrich a single product with all its relationships
     * @param {Product} product - Product to enrich
     * @returns {Product} Enriched product
     */
    enrichProduct(product) {
        // Set category
        if (product.categoryId) {
            const category = this.getCategory(product.categoryId);
            if (category) product.setCategory(category);
        }

        // Set brand
        if (product.brandId) {
            const brand = this.getBrand(product.brandId);
            if (brand) product.setBrand(brand);
        }

        // Set images
        const images = this.getProductImages(product.id);
        product.setImages(images);

        // Set specifications
        const specifications = this.getProductSpecifications(product.id);
        specifications.forEach(spec => {
            const specDef = this.getSpecification(spec.specificationId);
            if (specDef) spec.setSpecification(specDef);
        });
        product.setSpecifications(specifications);

        // Set tags
        const tags = this.getProductTags(product.id);
        product.setTags(tags);

        return product;
    }

    // ========== Helper Methods ==========

    getCategory(id) {
        return this.categoriesData.find(c => c.id === id) || null;
    }

    getBrand(id) {
        return this.brandsData.find(b => b.id === id) || null;
    }

    getTag(id) {
        return this.tagsData.find(t => t.id === id) || null;
    }

    getSpecification(id) {
        return this.specificationsData.find(s => s.id === id) || null;
    }

    getCoupon(id) {
        return this.couponsData.find(c => c.id === id) || null;
    }

    getProductImages(productId) {
        return this.productImages.filter(img => img.productId === productId);
    }

    getProductSpecifications(productId) {
        return this.productSpecifications.filter(spec => spec.productId === productId);
    }

    getProductTags(productId) {
        const tagIds = this.productTagAssos
            .filter(asso => asso.productId === productId)
            .map(asso => asso.tagId);

        return tagIds
            .map(tagId => this.getTag(tagId))
            .filter(tag => tag !== null);
    }

    // ========== Public API ==========

    /**
     * Get all products
     * @returns {Product[]} All products
     */
    getAllProducts() {
        return this.productsData;
    }

    /**
     * Get product by ID
     * @param {number} id - Product ID
     * @returns {Product|null} Product or null
     */
    getProduct(id) {
        return this.productsData.find(p => p.id === id) || null;
    }

    /**
     * Get all categories
     * @returns {Category[]} All categories
     */
    getAllCategories() {
        return this.categoriesData;
    }

    /**
     * Get all brands
     * @returns {Brand[]} All brands
     */
    getAllBrands() {
        return this.brandsData;
    }

    /**
     * Get all tags
     * @returns {Tag[]} All tags
     */
    getAllTags() {
        return this.tagsData;
    }

    /**
     * Search products by text
     * @param {string} query - Search query
     * @returns {Product[]} Matching products
     */
    searchProducts(query) {
        const lowerQuery = query.toLowerCase();
        return this.productsData.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Filter products by category
     * @param {number} categoryId - Category ID
     * @returns {Product[]} Products in category
     */
    getProductsByCategory(categoryId) {
        return this.productsData.filter(p => p.categoryId === categoryId);
    }

    /**
     * Filter products by brand
     * @param {number} brandId - Brand ID
     * @returns {Product[]} Products of brand
     */
    getProductsByBrand(brandId) {
        return this.productsData.filter(p => p.brandId === brandId);
    }

    /**
     * Filter products by tag
     * @param {string} tagName - Tag name
     * @returns {Product[]} Products with tag
     */
    getProductsByTag(tagName) {
        return this.productsData.filter(p => p.hasTag(tagName));
    }

    /**
     * Get products in stock
     * @returns {Product[]} In-stock products
     */
    getInStockProducts() {
        return this.productsData.filter(p => p.isInStock());
    }

    /**
     * Get products by price range
     * @param {number} min - Min price
     * @param {number} max - Max price
     * @returns {Product[]} Products in range
     */
    getProductsByPriceRange(min, max) {
        return this.productsData.filter(p => p.price >= min && p.price <= max);
    }

    /**
     * Get top rated products
     * @param {number} limit - Number of products
     * @returns {Product[]} Top rated products
     */
    getTopRatedProducts(limit = 10) {
        return [...this.productsData]
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    /**
     * Get featured products
     * @param {number} limit - Number of products
     * @returns {Product[]} Featured products
     */
    getFeaturedProducts(limit = 10) {
        return this.productsData
            .filter(p => p.isInStock() && p.score >= 4.5)
            .slice(0, limit);
    }

    /**
     * Get coupon by code
     * @param {string} code - Coupon code
     * @returns {Coupon|null} Coupon or null
     */
    getCouponByCode(code) {
        return this.couponsData.find(c => c.isValid(code)) || null;
    }

    /**
     * Get products with multiple filters
     * @param {Object} filters - Filter options
     * @returns {Product[]} Filtered products
     */
    filterProducts(filters = {}) {
        let products = this.productsData;

        if (filters.categoryId) {
            products = products.filter(p => p.categoryId === filters.categoryId);
        }

        if (filters.brandId) {
            products = products.filter(p => p.brandId === filters.brandId);
        }

        if (filters.tagName) {
            products = products.filter(p => p.hasTag(filters.tagName));
        }

        if (filters.minPrice !== undefined) {
            products = products.filter(p => p.price >= filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
            products = products.filter(p => p.price <= filters.maxPrice);
        }

        if (filters.minScore !== undefined) {
            products = products.filter(p => p.score >= filters.minScore);
        }

        if (filters.inStock) {
            products = products.filter(p => p.isInStock());
        }

        if (filters.search) {
            const query = filters.search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        return products;
    }

    /**
     * Get statistics
     * @returns {Object} Statistics
     */
    getStats() {
        return {
            categories: this.categoriesData.length,
            brands: this.brandsData.length,
            tags: this.tagsData.length,
            specifications: this.specificationsData.length,
            products: this.productsData.length,
            coupons: this.couponsData.length,
            productsInStock: this.getInStockProducts().length,
            productsOutOfStock: this.productsData.filter(p => !p.isInStock()).length,
            averagePrice: this.getAveragePrice(),
            averageScore: this.getAverageScore()
        };
    }

    getAveragePrice() {
        if (this.productsData.length === 0) return 0;
        const total = this.productsData.reduce((sum, p) => sum + p.price, 0);
        return Math.round(total / this.productsData.length);
    }

    getAverageScore() {
        if (this.productsData.length === 0) return 0;
        const total = this.productsData.reduce((sum, p) => sum + p.score, 0);
        return Math.round((total / this.productsData.length) * 10) / 10;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StaticDataManager;
}
