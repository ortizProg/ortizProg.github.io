import StaticDataManager from "./StaticDataManager.js";
import { InlineData } from "./InlineData.js";
import CartManager from "./CartManager.js";

/**
 * product-detail.js - Lógica para la página de detalle de producto
 */

// Inicializar managers
const dataManager = new StaticDataManager();
dataManager.initialize(InlineData);

const cartManager = new CartManager();

// Referencias DOM
const dom = {
    breadcrumbName: document.getElementById('breadcrumb-product-name'),
    mainImage: document.getElementById('main-image'),
    thumbnailsContainer: document.getElementById('thumbnails-container'),
    productName: document.getElementById('product-name'),
    productPrice: document.getElementById('product-price'),
    productStock: document.getElementById('product-stock'),
    productDescription: document.getElementById('product-description'),
    productSpecs: document.getElementById('product-specs'),
    addToCartBtn: document.getElementById('add-to-cart-btn'),
    quantityInput: document.getElementById('quantity'),
    cartBadge: document.getElementById('cart-badge')
};

// Inicialización
function init() {
    console.log('🔍 Inicializando Product Detail...');

    // Obtener ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        console.error('❌ No se proporcionó ID de producto');
        // Redirigir a home o mostrar error
        window.location.href = 'index.html';
        return;
    }

    const product = dataManager.getProduct(productId);

    if (!product) {
        console.error('❌ Producto no encontrado');
        document.body.innerHTML = '<div class="flex items-center justify-center min-h-screen text-white">Producto no encontrado</div>';
        return;
    }

    renderProductDetails(product);
    setupEventListeners(product);
    updateCartBadge();
}

function renderProductDetails(product) {
    // 1. Info Básica
    if (dom.breadcrumbName) dom.breadcrumbName.textContent = product.name;
    if (dom.productName) dom.productName.textContent = product.name;
    if (dom.productPrice) dom.productPrice.textContent = product.getFormattedPrice();
    if (dom.productDescription) dom.productDescription.textContent = product.description;

    // 2. Stock
    if (dom.productStock) {
        if (product.isInStock()) {
            dom.productStock.className = "text-sm font-semibold text-green-500 flex items-center gap-2";
            dom.productStock.innerHTML = `
                <span class="material-symbols-outlined !text-base">check_circle</span>
                In Stock (${product.stock} disponibles)
            `;
        } else {
            dom.productStock.className = "text-sm font-semibold text-red-500 flex items-center gap-2";
            dom.productStock.innerHTML = `
                <span class="material-symbols-outlined !text-base">cancel</span>
                Out of Stock
            `;
        }
    }

    // 3. Imágenes
    const mainImgUrl = product.getMainImage() || 'https://www.shutterstock.com/image-vector/product-defect-label-line-icon-600nw-2252869127.jpg';
    if (dom.mainImage) {
        dom.mainImage.style.backgroundImage = `url('${mainImgUrl}')`;
    }

    if (dom.thumbnailsContainer) {
        let images = [];
        if (product.images.length > 0) {
            images = product.images.map(img => ({ url: img.getImageUrl() }));
        } else {
            images = [{ url: mainImgUrl }];
        }

        dom.thumbnailsContainer.innerHTML = images.map((img, index) => `
            <div
                class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg border ${index === 0 ? 'border-primary' : 'border-white/10'} cursor-pointer hover:border-primary/50 transition-colors"
                style="background-image: url('${img.url}');"
                onclick="changeMainImage('${img.url}', this)"
            ></div>
        `).join('');
    }

    // 4. Especificaciones
    if (dom.productSpecs) {
        const specs = dataManager.getProductSpecifications(product.id);
        if (specs.length > 0) {
            dom.productSpecs.innerHTML = specs.map(spec => `
                <li class="flex items-center gap-2">
                    <span class="font-bold text-gray-700 dark:text-gray-300">${spec.specification.name}:</span>
                    <span class="text-gray-600 dark:text-gray-400">${spec.value} ${spec.specification.unit || ''}</span>
                </li>
            `).join('');
        } else {
            dom.productSpecs.innerHTML = '<li class="text-gray-500">No specifications available.</li>';
        }
    }
}

// Función global para cambiar imagen principal (necesaria porque se llama desde HTML generado)
window.changeMainImage = function (url, element) {
    if (dom.mainImage) {
        dom.mainImage.style.backgroundImage = `url('${url}')`;
    }

    // Actualizar bordes de thumbnails
    const thumbnails = dom.thumbnailsContainer.querySelectorAll('div');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('border-primary');
        thumb.classList.add('border-white/10');
    });
    element.classList.remove('border-white/10');
    element.classList.add('border-primary');
};

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
function setupEventListeners(product) {
    // Botón de añadir al carrito
    if (dom.addToCartBtn) {
        dom.addToCartBtn.addEventListener('click', () => {
            if (!product.isInStock()) {
                alert('Este producto está agotado');
                return;
            }

            const quantity = parseInt(dom.quantityInput?.value || 1);

            if (quantity <= 0) {
                alert('Cantidad inválida');
                return;
            }

            // Añadir al carrito
            cartManager.addItem(product.id, quantity);

            // Feedback visual
            alert(`✅ ${product.name} (x${quantity}) añadido al carrito!`);

            // Actualizar badge
            updateCartBadge();
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
