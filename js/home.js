import StaticDataManager from "./StaticDataManager.js";
import { InlineData } from "./InlineData.js"

/**
 * home.js - Lógica específica para la página de inicio
 */

// Inicializar el DataManager
const dataManager = new StaticDataManager();
dataManager.initialize(InlineData);

// Estado de la aplicación
const state = {
    filters: {
        search: '',
        inStock: false,
        preOrder: false,
        brands: [], // Array of IDs
        minPrice: undefined,
        maxPrice: undefined,
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
    searchInput: document.getElementById('search-input'),
    filters: {
        inStock: document.getElementById('filter-instock'),
        preOrder: document.getElementById('filter-preorder'),
        brandsContainer: document.getElementById('brands-filter-container'),
        minPrice: document.getElementById('min-price'),
        maxPrice: document.getElementById('max-price'),
        applyPriceBtn: document.getElementById('apply-price'),
        ratingContainer: document.getElementById('rating-filter-container')
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
    // 1. Filtrar productos usando el DataManager
    // Mapeamos el estado de filtros al formato que espera DataManager
    const filterOptions = {
        search: state.filters.search,
        inStock: state.filters.inStock,
        minPrice: state.filters.minPrice,
        maxPrice: state.filters.maxPrice,
        minScore: state.filters.minScore
    };

    // DataManager espera brandId (singular) pero aquí soportamos múltiples.
    // Hacemos el filtrado base con DataManager y luego refinamos si es necesario.
    let products = dataManager.filterProducts(filterOptions);

    // Filtrado adicional para múltiples marcas (si DataManager solo soporta una)
    // O si DataManager no soporta array de marcas, lo hacemos aquí.
    // StaticDataManager.js filterProducts soporta 'brandId' singular.
    // Así que filtramos marcas manualmente aquí para soportar selección múltiple.
    if (state.filters.brands.length > 0) {
        products = products.filter(p => state.filters.brands.includes(p.brandId));
    }

    // Filtrado de Pre-order (asumiendo que pre-order es stock <= 0 pero disponible, o una lógica específica)
    // En este caso, si el usuario selecciona "Pre-order", mostramos productos con stock 0 o flag de pre-order.
    // Ajustaremos la lógica según necesidad. Por ahora, si "Pre-order" está activo,
    // mostramos productos que NO están en stock pero son visibles.
    if (state.filters.preOrder) {
        // Si solo Pre-order está activo, mostramos solo pre-order.
        // Si In-Stock Y Pre-order están activos, mostramos ambos.
        if (!state.filters.inStock) {
            products = products.filter(p => !p.isInStock());
        }
        // Si ambos están activos, no filtramos por stock (mostramos todo).
    } else if (state.filters.inStock) {
        // Si solo In-Stock está activo (y no Pre-order), ya lo filtró filterProducts o lo hacemos aquí
        products = products.filter(p => p.isInStock());
    }

    // 2. Ordenar productos
    products = sortProducts(products);

    // 3. Actualizar contadores
    updateResultsCount(products.length);

    // 4. Paginar
    const totalPages = Math.ceil(products.length / state.pagination.itemsPerPage);
    // Asegurar que la página actual es válida
    if (state.pagination.page > totalPages) state.pagination.page = Math.max(1, totalPages);

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
        const mainImage = product.getMainImage() || 'https://www.shutterstock.com/image-vector/product-defect-label-line-icon-600nw-2252869127.jpg';

        return `
            <div class="flex flex-col group animate-fade-in">
                <div class="relative w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl bg-white/5 overflow-hidden">
                    <img 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src="${mainImage}"
                        alt="${product.name}"
                        onerror="this.src='https://www.shutterstock.com/image-vector/product-defect-label-line-icon-600nw-2252869127.jpg'"
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
                            data-product-id="${product.id}"
                            class="add-to-cart-btn flex items-center justify-center h-9 w-9 rounded-lg ${product.isInStock() ? 'bg-primary hover:bg-primary/90' : 'bg-white/20 cursor-not-allowed'} text-white transition-colors"
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
            data-page="${state.pagination.page - 1}"
            class="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 transition-colors ${state.pagination.page === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
            ${state.pagination.page === 1 ? 'disabled' : ''}
        >
            <span class="material-symbols-outlined text-xl pointer-events-none">chevron_left</span>
        </button>
    `;

    // Lógica simple de paginación (mostrar todas o rango)
    // Para simplificar, mostramos rango alrededor de la actual
    for (let i = 1; i <= totalPages; i++) {
        // Mostrar primera, última, y rango de 2 alrededor de la actual
        if (i === 1 || i === totalPages || (i >= state.pagination.page - 1 && i <= state.pagination.page + 1)) {
            const isActive = i === state.pagination.page;
            html += `
                <button 
                    data-page="${i}"
                    class="h-9 w-9 flex items-center justify-center rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-white/10 text-white'} font-bold text-sm transition-colors"
                >
                    ${i}
                </button>
            `;
        } else if (i === state.pagination.page - 2 || i === state.pagination.page + 2) {
            html += `<span class="text-white/40">...</span>`;
        }
    }

    html += `
        <button 
            data-page="${state.pagination.page + 1}"
            class="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 transition-colors ${state.pagination.page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
            ${state.pagination.page === totalPages ? 'disabled' : ''}
        >
            <span class="material-symbols-outlined text-xl pointer-events-none">chevron_right</span>
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
    if (newPage < 1) return;
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
            // Feedback visual simple
            alert(`¡${product.name} añadido al carrito!`);
        }
    }
}

// ========== Event Listeners ==========

function setupEventListeners() {
    // Search
    if (dom.searchInput) {
        dom.searchInput.addEventListener('input', (e) => {
            state.filters.search = e.target.value;
            state.pagination.page = 1;
            updateView();
        });
    }

    // Filtro de Stock
    if (dom.filters.inStock) {
        dom.filters.inStock.addEventListener('change', (e) => {
            state.filters.inStock = e.target.checked;
            state.pagination.page = 1;
            updateView();
        });
    }

    // Filtro de Pre-order
    if (dom.filters.preOrder) {
        dom.filters.preOrder.addEventListener('change', (e) => {
            state.filters.preOrder = e.target.checked;
            state.pagination.page = 1;
            updateView();
        });
    }

    // Filtro de Marcas (Delegación de eventos)
    if (dom.filters.brandsContainer) {
        dom.filters.brandsContainer.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const brandId = parseInt(e.target.value);
                toggleBrandFilter(brandId);
            }
        });
    }

    // Filtro de Precio
    if (dom.filters.applyPriceBtn) {
        dom.filters.applyPriceBtn.addEventListener('click', () => {
            const min = parseFloat(dom.filters.minPrice.value);
            const max = parseFloat(dom.filters.maxPrice.value);

            state.filters.minPrice = isNaN(min) ? undefined : min;
            state.filters.maxPrice = isNaN(max) ? undefined : max;

            state.pagination.page = 1;
            updateView();
        });
    }

    // Filtro de Rating (Delegación)
    if (dom.filters.ratingContainer) {
        dom.filters.ratingContainer.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                state.filters.minScore = parseFloat(e.target.value);
                state.pagination.page = 1;
                updateView();
            }
        });
    }

    // Ordenamiento
    if (dom.sortButton) {
        dom.sortButton.addEventListener('click', () => {
            // Ciclar modos de ordenamiento
            const modes = ['relevance', 'price-asc', 'price-desc', 'rating'];
            const currentIdx = modes.indexOf(state.sort);
            state.sort = modes[(currentIdx + 1) % modes.length];

            // Actualizar etiqueta
            const labels = {
                'relevance': 'Relevance',
                'price-asc': 'Price: Low to High',
                'price-desc': 'Price: High to Low',
                'rating': 'Top Rated'
            };
            if (dom.sortLabel) dom.sortLabel.textContent = `Sort by: ${labels[state.sort]}`;

            updateView();
        });
    }

    // Paginación (Delegación)
    if (dom.pagination) {
        dom.pagination.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn && !btn.disabled && btn.dataset.page) {
                changePage(parseInt(btn.dataset.page));
            }
        });
    }

    // Grid de Productos (Delegación para Add to Cart)
    if (dom.grid) {
        dom.grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart-btn');
            if (btn && !btn.disabled) {
                const productId = parseInt(btn.dataset.productId);
                addToCart(productId);
            }
        });
    }
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
