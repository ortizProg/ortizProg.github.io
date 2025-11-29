/**
 * ProductRepository - Repository for Product entities
 */
class ProductRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super('./data/products.json', Product);
    }

    /**
     * Get products by category ID
     * @param {number} categoryId - Category ID
     * @returns {Array} Products in category
     */
    getByCategory(categoryId) {
        return this.filter(product => product.categoryId === categoryId);
    }

    /**
     * Get products by brand ID
     * @param {number} brandId - Brand ID
     * @returns {Array} Products of brand
     */
    getByBrand(brandId) {
        return this.filter(product => product.brandId === brandId);
    }

    /**
     * Get products by tag name
     * @param {string} tagName - Tag name
     * @returns {Array} Products with tag
     */
    getByTag(tagName) {
        return this.filter(product => product.hasTag(tagName));
    }

    /**
     * Search products by name or description
     * @param {string} query - Search query
     * @returns {Array} Matching products
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Get only products in stock
     * @returns {Array} In-stock products
     */
    getInStock() {
        return this.filter(product => product.isInStock());
    }

    /**
     * Get products in price range
     * @param {number} min - Minimum price
     * @param {number} max - Maximum price
     * @returns {Array} Products in price range
     */
    getByPriceRange(min, max) {
        return this.filter(product =>
            product.price >= min && product.price <= max
        );
    }

    /**
     * Get products by minimum score
     * @param {number} minScore - Minimum score
     * @returns {Array} Products with score >= minScore
     */
    getByMinScore(minScore) {
        return this.filter(product => product.score >= minScore);
    }

    /**
     * Get top rated products
     * @param {number} limit - Number of products to return
     * @returns {Array} Top rated products
     */
    getTopRated(limit = 10) {
        return [...this.items]
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    /**
     * Get featured products (high score and in stock)
     * @param {number} limit - Number of products to return
     * @returns {Array} Featured products
     */
    getFeatured(limit = 10) {
        return this.filter(product =>
            product.isInStock() && product.score >= 4.5
        ).slice(0, limit);
    }

    /**
     * Sort products by price
     * @param {boolean} ascending - Sort ascending if true, descending if false
     * @returns {Array} Sorted products
     */
    sortByPrice(ascending = true) {
        return [...this.items].sort((a, b) =>
            ascending ? a.price - b.price : b.price - a.price
        );
    }

    /**
     * Sort products by score
     * @param {boolean} ascending - Sort ascending if true, descending if false
     * @returns {Array} Sorted products
     */
    sortByScore(ascending = false) {
        return [...this.items].sort((a, b) =>
            ascending ? a.score - b.score : b.score - a.score
        );
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductRepository;
}
