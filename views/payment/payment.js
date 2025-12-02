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

    const urlParams = new URLSearchParams(window.location.search);
    const isBuyNow = urlParams.get('type') === 'buy_now';

    // Check if cart is empty (only if not buy now)
    if (!isBuyNow && cartManager.getItemCount() === 0) {
        window.location.href = '../shop-car/shop-car.html';
        return;
    }

    renderOrderSummary(isBuyNow);
    setupEventListeners(isBuyNow);
}

function renderOrderSummary(isBuyNow) {
    let items = [];
    let totals = { subtotal: 0, shipping: 0, tax: 0, total: 0 };

    if (isBuyNow) {
        const directBuyData = JSON.parse(localStorage.getItem('aeroparts_direct_buy'));
        if (directBuyData) {
            const product = dataManager.getProduct(directBuyData.productId);
            if (product) {
                const subtotal = product.price * directBuyData.quantity;
                items = [{
                    product: product,
                    quantity: directBuyData.quantity,
                    subtotal: subtotal
                }];
                totals.subtotal = subtotal;
                totals.shipping = 15000; // Flat rate
                totals.tax = subtotal * 0.19;
                totals.total = totals.subtotal + totals.shipping + totals.tax;
            }
        }
    } else {
        items = cartManager.getCartWithDetails(dataManager);
        totals = cartManager.getCartTotals(dataManager);
    }

    // Render items
    if (dom.orderItems) {
        dom.orderItems.innerHTML = items.map(item => `
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

function setupEventListeners(isBuyNow) {
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
            dom.payBtn.textContent = 'Procesando...';

            await new Promise(resolve => setTimeout(resolve, 2000));

            let orderItems = [];
            let orderTotals = {};

            if (isBuyNow) {
                const directBuyData = JSON.parse(localStorage.getItem('aeroparts_direct_buy'));
                if (directBuyData) {
                    const product = dataManager.getProduct(directBuyData.productId);
                    const subtotal = product.price * directBuyData.quantity;
                    orderItems = [{
                        product: product,
                        quantity: directBuyData.quantity,
                        subtotal: subtotal
                    }];
                    orderTotals = {
                        subtotal: subtotal,
                        shipping: 15000,
                        tax: subtotal * 0.19,
                        total: subtotal + 15000 + (subtotal * 0.19)
                    };
                }
            } else {
                orderItems = cartManager.getCartWithDetails(dataManager);
                orderTotals = cartManager.getCartTotals(dataManager);
            }

            // Create order object
            const order = {
                id: 'AP-' + Math.floor(Math.random() * 10000) + '-99',
                date: new Date().toISOString(),
                items: orderItems,
                totals: orderTotals,
                shipping: JSON.parse(localStorage.getItem('aeroparts_shipping_info') || '{}')
            };

            // Save order to localStorage for confirmation page
            localStorage.setItem('aeroparts_last_order', JSON.stringify(order));

            // Clear cart ONLY if not buy now
            if (!isBuyNow) {
                cartManager.clearCart();
            } else {
                // Clear direct buy data
                localStorage.removeItem('aeroparts_direct_buy');
            }

            window.location.href = '../confirmation/confirmation.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
