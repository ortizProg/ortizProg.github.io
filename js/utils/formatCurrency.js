/**
 * formatCurrency.js - Funciones de utilidad para formatear moneda
 */

/**
 * Formatea un número como moneda en pesos colombianos (COP)
 * @param {number} amount - Cantidad a formatear
 * @param {boolean} showDecimals - Si debe mostrar decimales (default: false)
 * @returns {string} - Valor formateado en COP
 * @example
 * formatCOP(1234567) => "$1.234.567"
 * formatCOP(1234567.89, true) => "$1.234.567,89"
 */
export function formatCOP(amount, showDecimals = false) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '$0';
    }

    const options = {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0
    };

    return new Intl.NumberFormat('es-CO', options).format(amount);
}

/**
 * Formatea un número como moneda sin el símbolo
 * @param {number} amount - Cantidad a formatear
 * @param {boolean} showDecimals - Si debe mostrar decimales (default: false)
 * @returns {string} - Valor formateado sin símbolo
 */
export function formatNumber(amount, showDecimals = false) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '0';
    }

    const options = {
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0
    };

    return new Intl.NumberFormat('es-CO', options).format(amount);
}

// Para compatibilidad sin módulos ES6
if (typeof window !== 'undefined') {
    window.formatCOP = formatCOP;
    window.formatNumber = formatNumber;
}
