/**
 * TagRepository - Repository for Tag entities
 */
class TagRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super('./data/tags.json', Tag);
    }

    /**
     * Get tag by name (case-insensitive)
     * @param {string} name - Tag name
     * @returns {Tag|null} Tag or null if not found
     */
    getByName(name) {
        const lowerName = name.toLowerCase();
        return this.find(tag =>
            tag.name.toLowerCase() === lowerName
        );
    }

    /**
     * Get tags by name search
     * @param {string} query - Search query
     * @returns {Array} Matching tags
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.filter(tag =>
            tag.name.toLowerCase().includes(lowerQuery)
        );
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TagRepository;
}
