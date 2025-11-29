/**
 * CategoryRepository - Repository for Category entities
 */
class CategoryRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super('./data/categories.json', Category);
    }

    /**
     * Get categories by name search
     * @param {string} query - Search query
     * @returns {Array} Matching categories
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.filter(category =>
            category.name.toLowerCase().includes(lowerQuery)
        );
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CategoryRepository;
}
