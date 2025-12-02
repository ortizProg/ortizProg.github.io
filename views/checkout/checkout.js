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
                totals.shipping = 15000; // Flat rate for example
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
    // Render totals
    if (dom.subtotal) dom.subtotal.textContent = formatCOP(totals.subtotal);
    if (dom.shipping) dom.shipping.textContent = formatCOP(totals.shipping);
    if (dom.tax) dom.tax.textContent = formatCOP(totals.tax);
    if (dom.total) dom.total.textContent = formatCOP(totals.total);

    // Render discount
    const discountRow = document.getElementById('summary-discount-row');
    const discountEl = document.getElementById('summary-discount');
    if (discountRow && discountEl) {
        if (totals.discount > 0) {
            discountEl.textContent = `-${formatCOP(totals.discount)}`;
            discountRow.classList.remove('hidden');
        } else {
            discountRow.classList.add('hidden');
        }
    }
}

function setupEventListeners(isBuyNow) {
    if (dom.form) {
        dom.form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(dom.form);
            const shippingData = Object.fromEntries(formData.entries());

            // Save to localStorage (simulating persistence)
            localStorage.setItem('aeroparts_shipping_info', JSON.stringify(shippingData));

            // Redirect to payment
            const redirectUrl = isBuyNow ? '../payment/payment.html?type=buy_now' : '../payment/payment.html';
            window.location.href = redirectUrl;
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
