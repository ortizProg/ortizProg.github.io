/**
 * BrandRepository - Repository for Brand entities
 */
class BrandRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super('./data/brands.json', Brand);
    }

    /**
     * Get brands by name search
     * @param {string} query - Search query
     * @returns {Array} Matching brands
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.filter(brand =>
            brand.name.toLowerCase().includes(lowerQuery)
        );
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrandRepository;
}
