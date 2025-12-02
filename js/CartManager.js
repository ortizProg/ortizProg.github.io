/**
 * CartManager.js - Gestión del carrito de compras con localStorage
 */

class CartManager {
    constructor() {
        this.storageKey = 'aeroparts_cart';
    }

    /**
     * Obtiene el carrito desde localStorage
     * @returns {Array} Array de items {productId, quantity}
     */
    getCart() {
        try {
            const cartData = localStorage.getItem(this.storageKey);
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error al leer el carrito:', error);
            return [];
        }
    }

    /**
     * Guarda el carrito en localStorage
     * @param {Array} cart - Array de items del carrito
     */
    saveCart(cart) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(cart));
            // Disparar evento personalizado para que otros componentes se actualicen
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
        }
    }

    /**
     * Añade un producto al carrito o actualiza su cantidad
     * @param {number} productId - ID del producto
     * @param {number} quantity - Cantidad a añadir (default: 1)
     * @returns {boolean} - True si se añadió correctamente
     */
    addItem(productId, quantity = 1) {
        if (!productId || quantity <= 0) {
            console.error('ProductId inválido o cantidad incorrecta');
            return false;
        }

        const cart = this.getCart();
        const existingItem = cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }

        this.saveCart(cart);
        return true;
    }

    /**
     * Elimina un producto del carrito
     * @param {number} productId - ID del producto a eliminar
     * @returns {boolean} - True si se eliminó correctamente
     */
    removeItem(productId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => item.productId !== productId);

        if (filteredCart.length === cart.length) {
            console.warn('Producto no encontrado en el carrito');
            return false;
        }

        this.saveCart(filteredCart);
        return true;
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {number} productId - ID del producto
     * @param {number} quantity - Nueva cantidad (si es 0 o negativo, se elimina el item)
     * @returns {boolean} - True si se actualizó correctamente
     */
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            return this.removeItem(productId);
        }

        const cart = this.getCart();
        const item = cart.find(item => item.productId === productId);

        if (!item) {
            console.warn('Producto no encontrado en el carrito');
            return false;
        }

        item.quantity = quantity;
        this.saveCart(cart);
        return true;
    }

    /**
     * Vacía completamente el carrito
     */
    clearCart() {
        this.saveCart([]);
    }

    /**
     * Obtiene el número total de items en el carrito
     * @returns {number} - Total de items
     */
    getItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Obtiene el carrito con los detalles completos de los productos
     * @param {Object} dataManager - Instancia de StaticDataManager
     * @returns {Array} - Array de items con detalles completos
     */
    getCartWithDetails(dataManager) {
        const cart = this.getCart();

        return cart.map(item => {
            const product = dataManager.getProduct(item.productId);

            if (!product) {
                console.warn(`Producto ${item.productId} no encontrado en el catálogo`);
                return null;
            }

            return {
                ...item,
                product: product,
                subtotal: product.price * item.quantity
            };
        }).filter(item => item !== null); // Filtrar productos no encontrados
    }

    /**
     * Calcula el total del carrito
     * @param {Object} dataManager - Instancia de StaticDataManager
     * @returns {Object} - Objeto con subtotal, shipping, tax y total
     */
    getCartTotals(dataManager) {
        const cartWithDetails = this.getCartWithDetails(dataManager);

        const subtotal = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);
        const shipping = subtotal > 0 ? 10.00 : 0; // Envío fijo de $10 o gratis si el carrito está vacío
        const taxRate = 0.20; // 20% de IVA
        const tax = subtotal * taxRate;
        const total = subtotal + shipping + tax;

        return {
            subtotal: subtotal,
            shipping: shipping,
            tax: tax,
            total: total,
            itemCount: this.getItemCount()
        };
    }
}

// Exportar como módulo ES6 y también como variable global para compatibilidad
export default CartManager;

// Para uso sin módulos ES6
if (typeof window !== 'undefined') {
    window.CartManager = CartManager;
}
