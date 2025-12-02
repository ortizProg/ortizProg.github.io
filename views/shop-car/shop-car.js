import StaticDataManager from "../../js/StaticDataManager.js";
import { InlineData } from "../../js/InlineData.js";
import CartManager from "../../js/CartManager.js";
import { formatCOP } from "../../js/utils/formatCurrency.js";

/**
 * shop-car.js - Lógica para la página del carrito de compras
 */

// Inicializar managers
const dataManager = new StaticDataManager();
dataManager.initialize(InlineData);

const cartManager = new CartManager();

// Referencias DOM
const dom = {
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartItemCount: document.getElementById('cart-item-count'),
    subtotalElement: document.getElementById('subtotal'),
    shippingElement: document.getElementById('shipping'),
    taxElement: document.getElementById('tax'),
    totalElement: document.getElementById('total'),
    checkoutBtn: document.getElementById('checkout-btn'),
    cartBadge: document.getElementById('cart-badge')
};

// Inicialización
function init() {
    console.log('🛒 Inicializando Shopping Cart...');

    renderCart();
    setupEventListeners();
    updateCartBadge();

    console.log('✅ Shopping Cart inicializado');
}

// Renderizar el carrito completo
function renderCart() {
    const cartWithDetails = cartManager.getCartWithDetails(dataManager);

    if (!dom.cartItemsContainer) return;

    // Si el carrito está vacío
    if (cartWithDetails.length === 0) {
        renderEmptyCart();
        updateOrderSummary({ subtotal: 0, shipping: 0, tax: 0, total: 0, itemCount: 0 });
        return;
    }

    // Renderizar items del carrito
    dom.cartItemsContainer.innerHTML = cartWithDetails.map(item => {
        const product = item.product;
        const mainImage = product.getMainImage() || 'https://www.shutterstock.com/image-vector/product-defect-label-line-icon-600nw-2252869127.jpg';

        return `
            <div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-4">
                    <div
                        class="aspect-square w-20 flex-shrink-0 rounded-lg bg-cover bg-center"
                        style="background-image: url('${mainImage}');"
                    ></div>
                    <div class="flex flex-1 flex-col justify-center">
                        <p class="font-medium text-white">${product.name}</p>
                        <p class="text-sm text-base-content-secondary">Unit Price: ${formatCOP(product.price)}</p>
                        <p class="text-sm text-base-content-secondary">Subtotal: ${formatCOP(item.subtotal)}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between sm:justify-end sm:gap-6">
                    <div class="flex items-center gap-2">
                        <button
                            class="decrease-qty-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                            data-product-id="${product.id}"
                        >
                            -
                        </button>
                        <input
                            class="quantity-input w-10 border-none bg-transparent p-0 text-center text-white focus:outline-0 focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            type="number"
                            value="${item.quantity}"
                            data-product-id="${product.id}"
                            min="1"
                        />
                        <button
                            class="increase-qty-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                            data-product-id="${product.id}"
                        >
                            +
                        </button>
                    </div>
                    <div class="flex gap-1">
                        <button
                            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-base-content-secondary hover:bg-white/10 hover:text-primary"
                        >
                            <span class="material-symbols-outlined text-xl">favorite</span>
                        </button>
                        <button
                            class="remove-item-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-base-content-secondary hover:bg-accent/10 hover:text-accent"
                            data-product-id="${product.id}"
                        >
                            <span class="material-symbols-outlined text-xl">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Actualizar resumen del pedido
    const totals = cartManager.getCartTotals(dataManager);
    updateOrderSummary(totals);
}

// Renderizar estado de carrito vacío
function renderEmptyCart() {
    if (!dom.cartItemsContainer) return;

    dom.cartItemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-white/60">
            <span class="material-symbols-outlined text-8xl mb-4">shopping_cart</span>
            <p class="text-2xl font-medium mb-2">Your cart is empty</p>
            <p class="text-sm mb-6">Add some products to get started!</p>
            <a href="../home/home.html" 
               class="flex cursor-pointer items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary-hover">
                Continue Shopping
            </a>
        </div>
    `;
}

// Actualizar resumen del pedido
function updateOrderSummary(totals) {
    if (dom.cartItemCount) {
        const itemText = totals.itemCount === 1 ? 'item' : 'items';
        dom.cartItemCount.textContent = `You have ${totals.itemCount} ${itemText} in your cart.`;
    }

    if (dom.subtotalElement) {
        dom.subtotalElement.textContent = formatCOP(totals.subtotal);
    }

    if (dom.shippingElement) {
        dom.shippingElement.textContent = formatCOP(totals.shipping);
    }

    if (dom.taxElement) {
        dom.taxElement.textContent = formatCOP(totals.tax);
    }

    if (dom.totalElement) {
        dom.totalElement.textContent = formatCOP(totals.total);
    }
}

// Actualizar badge del carrito
function updateCartBadge() {
    const itemCount = cartManager.getItemCount();

    if (dom.cartBadge) {
        if (itemCount > 0) {
            dom.cartBadge.textContent = itemCount;
            dom.cartBadge.classList.remove('hidden');
        } else {
            dom.cartBadge.classList.add('hidden');
        }
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Delegación de eventos en el contenedor del carrito
    if (dom.cartItemsContainer) {
        dom.cartItemsContainer.addEventListener('click', (e) => {
            // Botón de incrementar cantidad
            const increaseBtn = e.target.closest('.increase-qty-btn');
            if (increaseBtn) {
                const productId = parseInt(increaseBtn.dataset.productId);
                const cart = cartManager.getCart();
                const item = cart.find(i => i.productId === productId);
                if (item) {
                    cartManager.updateQuantity(productId, item.quantity + 1);
                    renderCart();
                    updateCartBadge();
                }
                return;
            }

            // Botón de decrementar cantidad
            const decreaseBtn = e.target.closest('.decrease-qty-btn');
            if (decreaseBtn) {
                const productId = parseInt(decreaseBtn.dataset.productId);
                const cart = cartManager.getCart();
                const item = cart.find(i => i.productId === productId);
                if (item && item.quantity > 1) {
                    cartManager.updateQuantity(productId, item.quantity - 1);
                    renderCart();
                    updateCartBadge();
                }
                return;
            }

            // Botón de eliminar item
            const removeBtn = e.target.closest('.remove-item-btn');
            if (removeBtn) {
                const productId = parseInt(removeBtn.dataset.productId);
                if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
                    cartManager.removeItem(productId);
                    renderCart();
                    updateCartBadge();
                }
                return;
            }
        });

        // Event listener para cambios manuales en el input de cantidad
        dom.cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const productId = parseInt(e.target.dataset.productId);
                const newQuantity = parseInt(e.target.value);

                if (newQuantity > 0) {
                    cartManager.updateQuantity(productId, newQuantity);
                    renderCart();
                    updateCartBadge();
                } else {
                    // Si la cantidad es 0 o negativa, restaurar el valor anterior
                    renderCart();
                }
            }
        });
    }

    // Botón de checkout
    if (dom.checkoutBtn) {
        dom.checkoutBtn.addEventListener('click', () => {
            const itemCount = cartManager.getItemCount();
            if (itemCount === 0) {
                alert('Tu carrito está vacío. Añade productos para continuar.');
                return;
            }
            // Redirect to checkout page
            window.location.href = '../checkout/checkout.html';
        });
    }
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
