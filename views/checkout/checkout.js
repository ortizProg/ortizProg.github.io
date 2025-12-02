import StaticDataManager from "../../js/StaticDataManager.js";
import { InlineData } from "../../js/InlineData.js";
import CartManager from "../../js/CartManager.js";
import { formatCOP } from "../../js/utils/formatCurrency.js";

/**
 * checkout.js - Logic for the checkout shipping page
 */

// Initialize managers
const dataManager = new StaticDataManager();
dataManager.initialize(InlineData);
const cartManager = new CartManager();

const dom = {
    form: document.getElementById('shipping-form'),
    orderItems: document.getElementById('order-items'),
    subtotal: document.getElementById('summary-subtotal'),
    shipping: document.getElementById('summary-shipping'),
    tax: document.getElementById('summary-tax'),
    total: document.getElementById('summary-total')
};

function init() {
    console.log('📦 Initializing Checkout...');

    // Check if cart is empty
    if (cartManager.getItemCount() === 0) {
        window.location.href = 'views/shop-car/shop-car.html';
        return;
    }

    renderOrderSummary();
    setupEventListeners();
}

function renderOrderSummary() {
    const cartWithDetails = cartManager.getCartWithDetails(dataManager);
    const totals = cartManager.getCartTotals(dataManager);

    // Render items
    if (dom.orderItems) {
        dom.orderItems.innerHTML = cartWithDetails.map(item => `
            <div class="flex items-center gap-3 py-2">
                <div class="h-12 w-12 flex-shrink-0 rounded bg-cover bg-center" 
                     style="background-image: url('${item.product.getMainImage()}');"></div>
                <div class="flex-1 min-w-0">
                    <p class="truncate text-sm font-medium text-white">${item.product.name}</p>
                    <p class="text-xs text-base-content-secondary">Qty: ${item.quantity}</p>
                </div>
                <p class="text-sm font-medium text-white">${formatCOP(item.subtotal)}</p>
            </div>
        `).join('');
    }

    // Render totals
    if (dom.subtotal) dom.subtotal.textContent = formatCOP(totals.subtotal);
    if (dom.shipping) dom.shipping.textContent = formatCOP(totals.shipping);
    if (dom.tax) dom.tax.textContent = formatCOP(totals.tax);
    if (dom.total) dom.total.textContent = formatCOP(totals.total);
}

function setupEventListeners() {
    if (dom.form) {
        dom.form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(dom.form);
            const shippingData = Object.fromEntries(formData.entries());

            // Save to localStorage (simulating persistence)
            localStorage.setItem('aeroparts_shipping_info', JSON.stringify(shippingData));

            // Redirect to payment
            window.location.href = '../payment/payment.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
