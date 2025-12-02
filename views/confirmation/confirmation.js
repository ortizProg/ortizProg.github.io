import { formatCOP } from "../../js/utils/formatCurrency.js";

/**
 * confirmation.js - Logic for the order confirmation page
 */

const dom = {
    orderId: document.getElementById('order-id'),
    shippingAddress: document.getElementById('shipping-address'),
    orderItems: document.getElementById('order-items'),
    subtotal: document.getElementById('order-subtotal'),
    shipping: document.getElementById('order-shipping'),
    total: document.getElementById('order-total'),
    customerName: document.getElementById('customer-name')
};

function init() {
    console.log('✅ Initializing Confirmation...');

    // Get last order from localStorage
    const lastOrder = JSON.parse(localStorage.getItem('aeroparts_last_order'));

    if (!lastOrder) {
        // If no order found, redirect to home
        console.warn('No order found, redirecting to home...');
        // window.location.href = '../../index.html'; // Commented out for development testing
        return;
    }

    renderOrderDetails(lastOrder);
}

function renderOrderDetails(order) {
    // Render Order ID
    if (dom.orderId) dom.orderId.textContent = `#${order.id}`;

    // Render Customer Name (in header)
    if (dom.customerName && order.shipping.firstName) {
        dom.customerName.textContent = `Gracias por tu compra, ${order.shipping.firstName}.`;
    }

    // Render Shipping Address
    if (dom.shippingAddress) {
        const { firstName, lastName, address, city, state, zipCode } = order.shipping;
        dom.shippingAddress.innerHTML = `
            <p>${firstName} ${lastName}</p>
            <p>${address}</p>
            <p>${city}, ${state} ${zipCode}</p>
        `;
    }

    // Render Order Items
    if (dom.orderItems) {
        dom.orderItems.innerHTML = order.items.map(item => `
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-lg bg-center bg-cover" 
                     style="background-image: url('${item.product.getMainImage()}')">
                </div>
                <div class="flex-1">
                    <p class="text-gray-800 dark:text-text-dark font-medium">${item.product.name}</p>
                    <p class="text-gray-500 dark:text-text-dark/70 text-sm">Cantidad: ${item.quantity}</p>
                </div>
                <p class="text-gray-900 dark:text-text-dark font-semibold">${formatCOP(item.subtotal)}</p>
            </div>
        `).join('');
    }

    // Render Totals
    if (dom.subtotal) dom.subtotal.textContent = formatCOP(order.totals.subtotal);
    if (dom.shipping) dom.shipping.textContent = formatCOP(order.totals.shipping);
    if (dom.total) dom.total.textContent = formatCOP(order.totals.total);
}

document.addEventListener('DOMContentLoaded', init);
