import StaticDataManager from "./StaticDataManager.js";
import { InlineData } from "./InlineData.js"

// Inicializar el DataManager
const dataManager = new StaticDataManager();
dataManager.initialize(InlineData);

// Estado de la aplicación
const state = {
    filters: {
        search: '',
        inStock: false,
        preOrder: false,
        brands: [],
        minPrice: 0,
        maxPrice: 10000000,
        minScore: 0
    },
    sort: 'relevance', // relevance, price-asc, price-desc, rating
    pagination: {
        page: 1,
        itemsPerPage: 12
    }
};

// Referencias DOM
const dom = {
    grid: document.getElementById('products-grid'),
    resultsCount: document.getElementById('results-count'),
    filters: {
        inStock: document.getElementById('filter-instock'),
        preOrder: document.getElementById('filter-preorder'),
        brandsContainer: document.getElementById('brands-filter-container'),
        priceSlider: document.getElementById('price-slider'), // Placeholder
        rating: document.getElementById('rating-filter') // Placeholder
    },
    sortButton: document.getElementById('sort-button'),
    sortLabel: document.getElementById('sort-label'),
    pagination: document.getElementById('pagination-container')
};

// ========== Inicialización ==========

function init() {
    console.log('🏠 Inicializando Home...');

    // Renderizar filtros dinámicos (marcas)
    renderBrandFilters();

    // Configurar event listeners
    setupEventListeners();

    // Renderizar productos iniciales
    updateView();

    console.log('✅ Home inicializado');
}

// ========== Lógica de Renderizado ==========

function updateView() {
    // 1. Filtrar productos
    let products = dataManager.getAllProducts();

    // Aplicar filtros
    if (state.filters.inStock) {
        products = products.filter(p => p.isInStock());
    }

    if (state.filters.brands.length > 0) {
        products = products.filter(p => state.filters.brands.includes(p.brandId));
    }

    // 2. Ordenar productos
    products = sortProducts(products);

    // 3. Actualizar contadores
    updateResultsCount(products.length);

    // 4. Paginar
    const totalPages = Math.ceil(products.length / state.pagination.itemsPerPage);
    const startIndex = (state.pagination.page - 1) * state.pagination.itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + state.pagination.itemsPerPage);

    // 5. Renderizar grid
    renderProductGrid(paginatedProducts);

    // 6. Renderizar paginación
    renderPagination(totalPages);
}

function renderProductGrid(products) {
    if (!dom.grid) return;

    if (products.length === 0) {
        dom.grid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-12 text-white/60">
                <span class="material-symbols-outlined text-6xl mb-4">search_off</span>
                <p class="text-xl font-medium">No se encontraron productos</p>
                <p class="text-sm">Intenta ajustar tus filtros</p>
            </div>
        `;
        return;
    }

    dom.grid.innerHTML = products.map(product => {
        // Determinar estado de stock para el badge
        let stockBadge = '';
        if (!product.isInStock()) {
            stockBadge = `<div class="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-red-900 bg-red-200 rounded-full">Agotado</div>`;
        } else if (product.stock < 5) {
            stockBadge = `<div class="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-orange-900 bg-orange-200 rounded-full">¡Últimas unidades!</div>`;
        } else {
            stockBadge = `<div class="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-green-900 bg-green-200 rounded-full">En Stock</div>`;
        }

        // Imagen principal (manejo de fallback)
        const mainImage = product.getMainImage() || 'https://via.placeholder.com/300?text=No+Image';

        return `
            <div class="flex flex-col group animate-fade-in">
                <div class="relative w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl bg-white/5 overflow-hidden">
                    <img 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src="${mainImage}"
                        alt="${product.name}"
                        onerror="this.src='https://via.placeholder.com/300?text=Error'"
                    />
                    ${stockBadge}
                </div>
                <div class="flex flex-col pt-3 ${!product.isInStock() ? 'opacity-75' : ''}">
                    <div class="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span class="px-2 py-0.5 text-xs font-semibold rounded bg-white/10 text-white/80">
                            ${product.getBrandName()}
                        </span>
                        ${product.tags.slice(0, 2).map(tag => `
                            <span class="px-2 py-0.5 text-xs font-semibold rounded bg-white/10 text-white/80">
                                ${tag.name}
                            </span>
                        `).join('')}
                    </div>
                    <h4 class="text-base font-medium leading-normal text-white truncate" title="${product.name}">
                        ${product.name}
                    </h4>
                    <p class="text-sm font-normal leading-normal text-white/60">
                        ${product.isInStock() ? 'Envío inmediato' : 'Consultar disponibilidad'}
                    </p>
                    <div class="flex items-center justify-between mt-2">
                        <p class="text-lg font-bold text-white">${product.getFormattedPrice()}</p>
                        <button 
                            onclick="addToCart(${product.id})"
                            class="flex items-center justify-center h-9 w-9 rounded-lg ${product.isInStock() ? 'bg-primary hover:bg-primary/90' : 'bg-white/20 cursor-not-allowed'} text-white transition-colors"
                            ${!product.isInStock() ? 'disabled' : ''}
                        >
                            <span class="material-symbols-outlined text-xl">add_shopping_cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderBrandFilters() {
    if (!dom.filters.brandsContainer) return;

    const brands = dataManager.getAllBrands();

    dom.filters.brandsContainer.innerHTML = brands.map(brand => `
        <label class="flex items-center gap-2 cursor-pointer group">
            <input 
                type="checkbox" 
                value="${brand.id}"
                class="form-checkbox rounded bg-white/10 border-white/20 text-primary focus:ring-primary/50 transition-colors"
                onchange="toggleBrandFilter(${brand.id})"
            />
            <span class="text-sm text-white/80 group-hover:text-white transition-colors">${brand.name}</span>
        </label>
    `).join('');
}

function renderPagination(totalPages) {
    if (!dom.pagination) return;

    if (totalPages <= 1) {
        dom.pagination.innerHTML = '';
        return;
    }

    let html = `
        <button 
            onclick="changePage(${state.pagination.page - 1})"
            class="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 transition-colors ${state.pagination.page === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
            ${state.pagination.page === 1 ? 'disabled' : ''}
        >
            <span class="material-symbols-outlined text-xl">chevron_left</span>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === state.pagination.page;
        html += `
            <button 
                onclick="changePage(${i})"
                class="h-9 w-9 flex items-center justify-center rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-white/10 text-white'} font-bold text-sm transition-colors"
            >
                ${i}
            </button>
        `;
    }

    html += `
        <button 
            onclick="changePage(${state.pagination.page + 1})"
            class="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 transition-colors ${state.pagination.page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
            ${state.pagination.page === totalPages ? 'disabled' : ''}
        >
            <span class="material-symbols-outlined text-xl">chevron_right</span>
        </button>
    `;

    dom.pagination.innerHTML = html;
}

function updateResultsCount(count) {
    if (dom.resultsCount) {
        dom.resultsCount.textContent = `${count} resultados`;
    }
}

// ========== Lógica de Negocio ==========

function sortProducts(products) {
    const sorted = [...products];

    switch (state.sort) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.score - a.score);
        case 'relevance':
        default:
            // Por defecto ordenamos por score y luego disponibilidad
            return sorted.sort((a, b) => {
                if (a.isInStock() !== b.isInStock()) return b.isInStock() - a.isInStock();
                return b.score - a.score;
            });
    }
}

function toggleBrandFilter(brandId) {
    const index = state.filters.brands.indexOf(brandId);
    if (index === -1) {
        state.filters.brands.push(brandId);
    } else {
        state.filters.brands.splice(index, 1);
    }
    state.pagination.page = 1; // Resetear a primera página
    updateView();
}

function changePage(newPage) {
    state.pagination.page = newPage;
    updateView();
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addToCart(productId) {
    // Reutilizamos la función global si existe, o implementamos una básica
    if (window.addToCartGlobal) {
        window.addToCartGlobal(productId);
    } else {
        const product = dataManager.getProduct(productId);
        if (product && product.isInStock()) {
            alert(`¡${product.name} añadido al carrito!`);
        }
    }
}

// ========== Event Listeners ==========

function setupEventListeners() {
    // Filtro de Stock
    if (dom.filters.inStock) {
        dom.filters.inStock.addEventListener('change', (e) => {
            state.filters.inStock = e.target.checked;
            state.pagination.page = 1;
            updateView();
        });
    }

    // Ordenamiento
    // Aquí podríamos implementar un dropdown custom, por ahora simulamos con botones si existieran
    // O conectamos con el botón existente en el HTML
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
