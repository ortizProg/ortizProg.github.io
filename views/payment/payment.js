import StaticDataManager from "../../js/StaticDataManager.js";
import { InlineData } from "../../js/InlineData.js";
import CartManager from "../../js/CartManager.js";
import { formatCOP } from "../../js/utils/formatCurrency.js";

/**
 * payment.js - Logic for the payment page
 */

// Initialize managers
const dataManager = new StaticDataManager();
dataManager.initialize(InlineData);
const cartManager = new CartManager();

const dom = {
    orderItems: document.getElementById('order-items'),
    subtotal: document.getElementById('summary-subtotal'),
    shipping: document.getElementById('summary-shipping'),
    tax: document.getElementById('summary-tax'),
    total: document.getElementById('summary-total'),
    payBtn: document.getElementById('pay-btn'),
    form: document.getElementById('payment-form')
};

function init() {
    console.log('💳 Initializing Payment...');

    // Check if cart is empty
    if (cartManager.getItemCount() === 0) {
        window.location.href = '../shop-car/shop-car.html';
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
            <div class="flex items-center gap-4">
                <img class="h-16 w-16 rounded-lg object-cover"
                    src="${item.product.getMainImage()}" />
                <div class="flex-1">
                    <p class="font-medium text-text-light-primary dark:text-text-dark-primary">
                        ${item.product.name}</p>
                    <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary/70">
                        Qty: ${item.quantity}</p>
                </div>
                <p class="font-medium text-text-light-primary dark:text-text-dark-primary">
                    ${formatCOP(item.subtotal)}
                </p>
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
    if (dom.payBtn) {
        dom.payBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // Basic validation
            const form = dom.form;
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Simulate processing
            dom.payBtn.disabled = true;
            dom.payBtn.textContent = 'Processing...';

            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            alert('¡Pago exitoso! Gracias por tu compra.');

            // Clear cart and redirect
            cartManager.clearCart();
            window.location.href = '../../index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
