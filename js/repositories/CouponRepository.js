/**
 * CouponRepository - Repository for Coupon entities
 */
import BaseRepository from "./BaseRepository.js";
import Coupon from "../models/Coupon.js";
export default class CouponRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super('./data/coupons.json', Coupon);
    }

    /**
     * Get coupon by code (case-insensitive)
     * @param {string} code - Coupon code
     * @returns {Coupon|null} Coupon or null if not found
     */
    getByCode(code) {
        return this.find(coupon => coupon.isValid(code));
    }

    /**
     * Validate and get coupon by code
     * @param {string} code - Coupon code
     * @returns {Object} Object with valid flag and coupon if found
     */
    validate(code) {
        const coupon = this.getByCode(code);
        return {
            valid: coupon !== null,
            coupon: coupon
        };
    }

    /**
     * Get coupons by minimum discount
     * @param {number} minDiscount - Minimum discount percentage
     * @returns {Array} Coupons with discount >= minDiscount
     */
    getByMinDiscount(minDiscount) {
        return this.filter(coupon => coupon.discPorcent >= minDiscount);
    }
}
