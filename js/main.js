// main.js - Lógica principal para renderizar productos dinámicamente

// Inicializar el DataManager
const dataManager = new StaticDataManager();
dataManager.initialize(InlineData);

console.log('✅ Sistema cargado:', dataManager.getStats());

// ========== Funciones de Renderizado ==========

/**
 * Renderizar productos en formato de tarjeta
 */
function renderProductCard(product) {
    return `
        <div class="flex h-full min-w-60 flex-1 flex-col gap-4 rounded-xl border border-border-light bg-card-light p-4 dark:border-border-dark dark:bg-card-dark dark:backdrop-blur-xl">
            <div class="aspect-square w-full rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                🚁
            </div>
            <div class="flex flex-1 flex-col justify-between gap-4">
                <div>
                    <p class="font-medium">${product.name}</p>
                    <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        ${product.getBrandName()} - ${product.getFormattedPrice()}
                    </p>
                    <div class="mt-2 flex gap-1 text-yellow-400 text-sm">
                        ${'★'.repeat(Math.floor(product.score))}${'☆'.repeat(5 - Math.floor(product.score))}
                        <span class="text-text-light-secondary dark:text-text-dark-secondary ml-1">${product.score}</span>
                    </div>
                </div>
                <button 
                    onclick="addToCart(${product.id})"
                    class="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary text-sm font-bold text-white hover:bg-primary/90 transition">
                    <span class="truncate">Añadir al carrito</span>
                </button>
            </div>
        </div>
    `;
}

/**
 * Renderizar sección de "Novedades"
 */
function renderNovedades() {
    const container = document.getElementById('novedades-container');
    if (!container) return;

    // Obtener productos destacados
    const products = dataManager.getFeaturedProducts(4);

    container.innerHTML = products.map(product => renderProductCard(product)).join('');
}

/**
 * Renderizar sección de "Más Vendidos"
 */
function renderMasVendidos() {
    const container = document.querySelector('#mas-vendidos-container');
    if (!container) return;

    // Obtener top productos
    const products = dataManager.getTopRatedProducts(4);

    container.innerHTML = products.map(product => renderProductCard(product)).join('');
}

/**
 * Implementar búsqueda
 */
function setupSearch() {
    const searchInput = document.querySelector('input[placeholder*="Busca por modelo"]');
    const searchButton = searchInput?.nextElementSibling?.querySelector('button');

    if (!searchInput || !searchButton) return;

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (!query) {
            alert('Por favor ingresa un término de búsqueda');
            return;
        }

        const results = dataManager.searchProducts(query);

        if (results.length === 0) {
            alert(`No se encontraron productos para "${query}"`);
        } else {
            showSearchResults(results, query);
        }
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Mostrar resultados de búsqueda
 */
function showSearchResults(products, query) {
    const resultsHTML = `
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onclick="this.remove()">
            <div class="bg-white dark:bg-base-200 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-auto p-6" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-2xl font-bold">Resultados para "${query}"</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-2xl">✕</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${products.map(product => `
                        <div class="border border-border-light dark:border-border-dark rounded-lg p-4">
                            <div class="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-4xl mb-3">
                                🚁
                            </div>
                            <h4 class="font-medium mb-2">${product.name}</h4>
                            <div class="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">
                                ${product.getCategoryName()} • ${product.getBrandName()}
                            </div>
                            <div class="flex gap-1 text-yellow-400 text-xs mb-2">
                                ${'★'.repeat(Math.floor(product.score))}${'☆'.repeat(5 - Math.floor(product.score))}
                                <span class="text-text-light-secondary dark:text-text-dark-secondary ml-1">${product.score}</span>
                            </div>
                            <div class="text-lg font-bold text-primary mb-2">${product.getFormattedPrice()}</div>
                            <div class="text-xs ${product.isInStock() ? 'text-green-600' : 'text-red-600'}">
                                ${product.isInStock() ? `✓ ${product.stock} disponibles` : '✕ Agotado'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', resultsHTML);
}

/**
 * Configurar botones de colecciones rápidas
 */
function setupQuickCollections() {
    const buttons = document.querySelectorAll('section button');

    buttons.forEach(button => {
        const text = button.textContent.trim();

        if (text === 'Frames 5"') {
            button.addEventListener('click', () => {
                const products = dataManager.filterProducts({
                    search: 'frame 5',
                    inStock: true
                });
                showSearchResults(products, 'Frames 5"');
            });
        } else if (text.includes('Motores')) {
            button.addEventListener('click', () => {
                const products = dataManager.searchProducts('motor');
                showSearchResults(products, 'Motores 2207/2306');
            });
        } else if (text === 'VTx') {
            button.addEventListener('click', () => {
                const products = dataManager.searchProducts('vtx');
                showSearchResults(products, 'VTx');
            });
        } else if (text.includes('Baterías')) {
            button.addEventListener('click', () => {
                const products = dataManager.searchProducts('batería');
                showSearchResults(products, 'Baterías 6S');
            });
        }
    });
}

/**
 * Función para agregar al carrito
 */
function addToCart(productId) {
    const product = dataManager.getProduct(productId);

    if (!product) {
        alert('Producto no encontrado');
        return;
    }

    if (!product.isInStock()) {
        alert('Producto agotado');
        return;
    }

    console.log('Agregando al carrito:', product.toJSON());

    alert(`✓ ${product.name} agregado al carrito\n\nPrecio: ${product.getFormattedPrice()}\nMarca: ${product.getBrandName()}`);

    // Aquí puedes implementar la lógica real del carrito
    // Por ejemplo, guardar en localStorage
}

// ========== Inicialización ==========

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    console.log('🔄 Inicializando aplicación...');

    // Renderizar secciones
    renderNovedades();
    renderMasVendidos();

    // Configurar búsqueda
    setupSearch();

    // Configurar colecciones rápidas
    setupQuickCollections();

    console.log('✅ Aplicación inicializada');
}
