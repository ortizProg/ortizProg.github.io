/**
 * SpecificationRepository - Repository for Specification entities
 */
class SpecificationRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super('./data/specifications.json', Specification);
    }

    /**
     * Get specification by name (case-insensitive)
     * @param {string} name - Specification name
     * @returns {Specification|null} Specification or null if not found
     */
    getByName(name) {
        const lowerName = name.toLowerCase();
        return this.find(spec =>
            spec.name.toLowerCase() === lowerName
        );
    }

    /**
     * Get specifications by name search
     * @param {string} query - Search query
     * @returns {Array} Matching specifications
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.filter(spec =>
            spec.name.toLowerCase().includes(lowerQuery)
        );
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpecificationRepository;
}
