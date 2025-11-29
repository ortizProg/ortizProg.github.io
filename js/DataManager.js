/**
 * DataManager - Central manager for all data and repositories
 * Coordinates loading and relationships between all entities
 */
class DataManager {
    constructor() {
        // Initialize repositories
        this.categories = new CategoryRepository();
        this.brands = new BrandRepository();
        this.tags = new TagRepository();
        this.specifications = new SpecificationRepository();
        this.products = new ProductRepository();
        this.coupons = new CouponRepository();

        // Data for relationships
        this.productImages = [];
        this.productSpecifications = [];
        this.productTagAssos = [];

        this.initialized = false;
    }

    /**
     * Initialize all data - load all repositories and relationships
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this.initialized) {
            console.log('⚠ DataManager already initialized');
            return;
        }

        console.log('🔄 Initializing DataManager...');

        try {
            // Load all repositories in parallel
            await Promise.all([
                this.categories.load(),
                this.brands.load(),
                this.tags.load(),
                this.specifications.load(),
                this.products.load(),
                this.coupons.load()
            ]);

            // Load relationship data
            const relationshipData = await JsonLoader.loadMultiple({
                productImages: './data/product_images.json',
                productSpecifications: './data/product_specifications.json',
                productTagAssos: './data/product_tag_assos.json'
            });

            // Create relationship objects
            this.productImages = relationshipData.productImages.map(
                data => new ProductImage(data)
            );
            this.productSpecifications = relationshipData.productSpecifications.map(
                data => new ProductSpecification(data)
            );
            this.productTagAssos = relationshipData.productTagAssos.map(
                data => new ProductTagAssociation(data)
            );

            console.log(`✓ Loaded ${this.productImages.length} product images`);
            console.log(`✓ Loaded ${this.productSpecifications.length} product specifications`);
            console.log(`✓ Loaded ${this.productTagAssos.length} product-tag associations`);

            // Enrich all products with relationships
            this.enrichAllProducts();

            this.initialized = true;
            console.log('✅ DataManager initialized successfully!');

        } catch (error) {
            console.error('❌ Error initializing DataManager:', error);
            throw error;
        }
    }

    /**
     * Enrich all products with their relationships
     */
    enrichAllProducts() {
        const products = this.products.getAll();
        products.forEach(product => this.enrichProduct(product));
        console.log(`✓ Enriched ${products.length} products with relationships`);
    }

    /**
     * Enrich a single product with all its relationships
     * @param {Product} product - Product to enrich
     * @returns {Product} Enriched product
     */
    enrichProduct(product) {
        // Set category
        if (product.categoryId) {
            const category = this.categories.getById(product.categoryId);
            if (category) {
                product.setCategory(category);
            }
        }

        // Set brand
        if (product.brandId) {
            const brand = this.brands.getById(product.brandId);
            if (brand) {
                product.setBrand(brand);
            }
        }

        // Set images
        const images = this.getProductImages(product.id);
        product.setImages(images);

        // Set specifications with references
        const specifications = this.getProductSpecifications(product.id);
        specifications.forEach(spec => {
            const specDef = this.specifications.getById(spec.specificationId);
            if (specDef) {
                spec.setSpecification(specDef);
            }
        });
        product.setSpecifications(specifications);

        // Set tags
        const tags = this.getProductTags(product.id);
        product.setTags(tags);

        return product;
    }

    /**
     * Get product with all relationships loaded
     * @param {number} productId - Product ID
     * @returns {Product|null} Enriched product or null
     */
    getProductWithRelations(productId) {
        const product = this.products.getById(productId);
        if (!product) {
            return null;
        }
        return this.enrichProduct(product);
    }

    /**
     * Get all images for a product
     * @param {number} productId - Product ID
     * @returns {ProductImage[]} Array of product images
     */
    getProductImages(productId) {
        return this.productImages.filter(img => img.productId === productId);
    }

    /**
     * Get all specifications for a product
     * @param {number} productId - Product ID
     * @returns {ProductSpecification[]} Array of product specifications
     */
    getProductSpecifications(productId) {
        return this.productSpecifications.filter(spec => spec.productId === productId);
    }

    /**
     * Get all tags for a product
     * @param {number} productId - Product ID
     * @returns {Tag[]} Array of tags
     */
    getProductTags(productId) {
        const tagIds = this.productTagAssos
            .filter(asso => asso.productId === productId)
            .map(asso => asso.tagId);

        return tagIds
            .map(tagId => this.tags.getById(tagId))
            .filter(tag => tag !== null);
    }

    /**
     * Get products by multiple filters
     * @param {Object} filters - Filter object
     * @param {number} [filters.categoryId] - Filter by category
     * @param {number} [filters.brandId] - Filter by brand
     * @param {string} [filters.tagName] - Filter by tag name
     * @param {number} [filters.minPrice] - Min price
     * @param {number} [filters.maxPrice] - Max price
     * @param {number} [filters.minScore] - Min score
     * @param {boolean} [filters.inStock] - Only in stock
     * @param {string} [filters.search] - Search query
     * @returns {Product[]} Filtered products
     */
    getProducts(filters = {}) {
        let products = this.products.getAll();

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
     * Get statistics about the data
     * @returns {Object} Statistics object
     */
    getStats() {
        return {
            categories: this.categories.count(),
            brands: this.brands.count(),
            tags: this.tags.count(),
            specifications: this.specifications.count(),
            products: this.products.count(),
            coupons: this.coupons.count(),
            productsInStock: this.products.getInStock().length,
            productsOutOfStock: this.products.getAll().filter(p => !p.isInStock()).length,
            averagePrice: this.getAveragePrice(),
            averageScore: this.getAverageScore()
        };
    }

    /**
     * Get average product price
     * @returns {number} Average price
     */
    getAveragePrice() {
        const products = this.products.getAll();
        if (products.length === 0) return 0;
        const total = products.reduce((sum, p) => sum + p.price, 0);
        return Math.round(total / products.length);
    }

    /**
     * Get average product score
     * @returns {number} Average score
     */
    getAverageScore() {
        const products = this.products.getAll();
        if (products.length === 0) return 0;
        const total = products.reduce((sum, p) => sum + p.score, 0);
        return Math.round((total / products.length) * 10) / 10;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
