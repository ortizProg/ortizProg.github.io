/**
 * InlineData - All data embedded directly in JavaScript
 * This eliminates the need for fetch() and allows the page to work as a static site
 */
export const InlineData = {
    categories: [
        { "id": 1, "name": "Drones RTF" },
        { "id": 2, "name": "RC Aviones" },
        { "id": 3, "name": "RC Helicópteros" },
        { "id": 4, "name": "Componentes" }
    ],

    brands: [
        { "id": 1, "name": "China Fly" },
        { "id": 2, "name": "Aero Parts" },
        { "id": 3, "name": "SkyRacer Tech" },
        { "id": 4, "name": "VoltAir RC" },
        { "id": 5, "name": "FPV Pro Line" }
    ],

    tags: [
        { "id": 1, "name": "Motor 2207" },
        { "id": 2, "name": "2450KV" },
        { "id": 3, "name": "6S" },
        { "id": 4, "name": "Freestyle" },
        { "id": 5, "name": "Racing" },
        { "id": 6, "name": "Long Range" },
        { "id": 7, "name": "Principiante" },
        { "id": 8, "name": "Intermedio" },
        { "id": 9, "name": "Avanzado" },
        { "id": 10, "name": "Frame 5 pulgadas" },
        { "id": 11, "name": "Frame 7 pulgadas" },
        { "id": 12, "name": "Batería LiPo" },
        { "id": 13, "name": "Cargador inteligente" },
        { "id": 14, "name": "Gafas FPV" },
        { "id": 15, "name": "VTx" },
        { "id": 16, "name": "Controladora de vuelo" },
        { "id": 17, "name": "ESC 4 en 1" },
        { "id": 18, "name": "Hélices 5x4.3" },
        { "id": 19, "name": "Kit de herramientas" },
        { "id": 20, "name": "Soldador" }
    ],

    specifications: [
        { "id": 1, "name": "Tamaño" },
        { "id": 2, "name": "Peso" },
        { "id": 3, "name": "Voltaje" },
        { "id": 4, "name": "Dimensiones" },
        { "id": 5, "name": "Materiales" },
        { "id": 6, "name": "KV del motor" },
        { "id": 7, "name": "Número de celdas (S)" },
        { "id": 8, "name": "Capacidad (mAh)" },
        { "id": 9, "name": "Conector" },
        { "id": 10, "name": "Uso recomendado" }
    ],

    products: [
        { "id": 1, "name": "Motor brushless 2207 2450KV AeroX Falcon", "description": "Motor brushless 2207 de alto rendimiento para drones freestyle 5 pulgadas.", "image": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80", "score": 4.9, "category_id": 4, "brand_id": 3, "price": 149900, "stock": 20 },
        { "id": 2, "name": "Motor brushless 2306 1750KV Raptor Pro V2", "description": "Motor 2306 1750KV ideal para drones de largo alcance en 6S.", "image": "https://images.unsplash.com/photo-1564518385658-c90636a43bb5?auto=format&fit=crop&w=800&q=80", "score": 4.7, "category_id": 4, "brand_id": 4, "price": 139900, "stock": 15 },
        { "id": 3, "name": "Frame freestyle 5 pulgadas Carbono X5", "description": "Frame de 5 pulgadas en fibra de carbono 3K para drones freestyle.", "image": "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80", "score": 4.8, "category_id": 4, "brand_id": 2, "price": 189900, "stock": 12 },
        { "id": 4, "name": "Frame long range 7 pulgadas Explorer LR7", "description": "Frame de 7 pulgadas para vuelos de largo alcance, diseño ligero y resistente.", "image": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", "score": 4.6, "category_id": 4, "brand_id": 5, "price": 219900, "stock": 8 },
        { "id": 5, "name": "Hélices 5x4.3x3 triblades pack x4", "description": "Juego de 4 hélices triblade 5x4.3 para drones racing o freestyle.", "image": "https://images.unsplash.com/photo-1597589022928-DE8fbea1e207?auto=format&fit=crop&w=800&q=80", "score": 4.5, "category_id": 4, "brand_id": 1, "price": 19900, "stock": 60 },
        { "id": 6, "name": "Hélices 7x3.5x2 para long range pack x4", "description": "Hélices 7 pulgadas de dos palas optimizadas para eficiencia en largo alcance.", "image": "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=800&q=80", "score": 4.4, "category_id": 4, "brand_id": 1, "price": 24900, "stock": 40 },
        { "id": 7, "name": "Batería LiPo 6S 1300mAh 100C FPV Pro", "description": "Batería LiPo de alto rendimiento para drones racing en 6S.", "image": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80", "score": 4.8, "category_id": 4, "brand_id": 5, "price": 129900, "stock": 25 },
        { "id": 8, "name": "Batería LiPo 4S 1500mAh 75C Freestyle", "description": "Batería 4S ideal para drones freestyle de 5 pulgadas.", "image": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80", "score": 4.6, "category_id": 4, "brand_id": 5, "price": 109900, "stock": 30 },
        { "id": 9, "name": "Controladora de vuelo F7 con OSD", "description": "FC F7 con OSD integrado, soporte para Betaflight e INAV.", "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", "score": 4.9, "category_id": 4, "brand_id": 4, "price": 209900, "stock": 18 },
        { "id": 10, "name": "ESC 4 en 1 45A BLHeli_32", "description": "Variador 4 en 1 de 45A con soporte 3–6S y firmware BLHeli_32.", "image": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80", "score": 4.7, "category_id": 4, "brand_id": 3, "price": 229900, "stock": 16 },
        { "id": 11, "name": "VTx 800mW 5.8GHz con SmartAudio", "description": "Transmisor de video 5.8GHz con potencia ajustable hasta 800mW.", "image": "https://images.unsplash.com/photo-1563770095-39d468f95742?auto=format&fit=crop&w=800&q=80", "score": 4.6, "category_id": 4, "brand_id": 2, "price": 159900, "stock": 20 },
        { "id": 12, "name": "Antena FPV pagoda RHCP 5.8GHz", "description": "Antena tipo pagoda RHCP para gafas o dron FPV.", "image": "https://images.unsplash.com/photo-1597589022928-DE8fbea1e207?auto=format&fit=crop&w=800&q=80", "score": 4.5, "category_id": 4, "brand_id": 1, "price": 49900, "stock": 50 },
        { "id": 13, "name": "Gafas FPV digitales 1080p", "description": "Gafas FPV con pantalla de alta resolución y receptor digital.", "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", "score": 4.9, "category_id": 1, "brand_id": 4, "price": 1899900, "stock": 6 },
        { "id": 14, "name": "Kit de dron freestyle 5 pulgadas RTF", "description": "Kit completo listo para volar con control remoto, dron y receptor.", "image": "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=800&q=80", "score": 4.7, "category_id": 1, "brand_id": 3, "price": 2399900, "stock": 5 },
        { "id": 15, "name": "Transmisor de radio 2.4GHz multiprotocolo", "description": "Radio de control 2.4GHz con protocolo multiprotocolo y pantalla LCD.", "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80", "score": 4.8, "category_id": 4, "brand_id": 2, "price": 899900, "stock": 10 },
        { "id": 16, "name": "Kit de herramientas para drones", "description": "Kit con destornilladores, llaves hexagonales y accesorios para montaje.", "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80", "score": 4.4, "category_id": 4, "brand_id": 1, "price": 99900, "stock": 35 },
        { "id": 17, "name": "Soldador eléctrico 60W punta fina", "description": "Soldador de 60W con temperatura ajustable para electrónica.", "image": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80", "score": 4.5, "category_id": 4, "brand_id": 2, "price": 79900, "stock": 28 },
        { "id": 18, "name": "Cargador balanceador dual 2x100W", "description": "Cargador inteligente con dos canales independientes hasta 6S.", "image": "https://images.unsplash.com/photo-1609976711693-a1dbc0b3e368?auto=format&fit=crop&w=800&q=80", "score": 4.7, "category_id": 4, "brand_id": 4, "price": 369900, "stock": 9 },
        { "id": 19, "name": "Cableado de silicona 14AWG rojo/negro 1m", "description": "Par de cables de silicona 14AWG de alta flexibilidad.", "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", "score": 4.3, "category_id": 4, "brand_id": 5, "price": 15900, "stock": 80 },
        { "id": 20, "name": "Tornillería M3 acero inoxidable surtida", "description": "Set de tornillos M3 surtidos para montaje de drones y frames.", "image": "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=800&q=80", "score": 4.6, "category_id": 4, "brand_id": 3, "price": 29900, "stock": 70 }
    ],

    productImages: [
        // Motors (Cat 5) - Using mechanical/drone closeups
        { "product_id": 1, "image": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 1, "image": "https://images.unsplash.com/photo-1564518385658-c90636a43bb5?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 2, "image": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 2, "image": "https://images.unsplash.com/photo-1506469717969-08fc1dd26023?auto=format&fit=crop&w=800&q=80", "order": 2 },

        // Frames (Cat 4) - Using carbon fiber/drone body images
        { "product_id": 3, "image": "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 3, "image": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 4, "image": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 4, "image": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80", "order": 2 },

        // Props (Cat 6) - Using propeller/fan images
        { "product_id": 5, "image": "https://images.unsplash.com/photo-1597589022928-DE8fbea1e207?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 5, "image": "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 6, "image": "https://images.unsplash.com/photo-1597589022928-DE8fbea1e207?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 6, "image": "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=800&q=80", "order": 2 },

        // Batteries (Cat 7) - Using battery/power images
        { "product_id": 7, "image": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 7, "image": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 8, "image": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 8, "image": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80", "order": 2 },

        // Electronics (Cat 8) - Using circuit board/chip images
        { "product_id": 9, "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 9, "image": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 10, "image": "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 10, "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 11, "image": "https://images.unsplash.com/photo-1563770095-39d468f95742?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 11, "image": "https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 12, "image": "https://images.unsplash.com/photo-1597589022928-DE8fbea1e207?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 12, "image": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 13, "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 13, "image": "https://images.unsplash.com/photo-1535378437-d6d31151e2e6?auto=format&fit=crop&w=800&q=80", "order": 2 },

        // Kits/Radios (Cat 1)
        { "product_id": 14, "image": "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 14, "image": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 15, "image": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 15, "image": "https://images.unsplash.com/photo-1551817958-c1b061cb59f7?auto=format&fit=crop&w=800&q=80", "order": 2 },

        // Tools (Cat 9) - Using soldering/tool images
        { "product_id": 16, "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 16, "image": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 17, "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 17, "image": "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 18, "image": "https://images.unsplash.com/photo-1609976711693-a1dbc0b3e368?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 18, "image": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 19, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 19, "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", "order": 2 },
        { "product_id": 20, "image": "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=800&q=80", "order": 1 },
        { "product_id": 20, "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80", "order": 2 }
    ],

    productSpecifications: [
        { "product_id": 1, "specification_id": 2, "value": "32 g" },
        { "product_id": 1, "specification_id": 4, "value": "N/A" },
        { "product_id": 1, "specification_id": 6, "value": "2450KV" },
        { "product_id": 1, "specification_id": 7, "value": "6S" },
        { "product_id": 1, "specification_id": 10, "value": "Racing" },
        { "product_id": 2, "specification_id": 2, "value": "32 g" },
        { "product_id": 2, "specification_id": 4, "value": "N/A" },
        { "product_id": 2, "specification_id": 6, "value": "1750KV" },
        { "product_id": 2, "specification_id": 7, "value": "6S" },
        { "product_id": 2, "specification_id": 10, "value": "Racing" },
        { "product_id": 3, "specification_id": 2, "value": "10 g" },
        { "product_id": 3, "specification_id": 4, "value": "5 pulgadas" },
        { "product_id": 3, "specification_id": 5, "value": "Fibra de carbono 3K" },
        { "product_id": 3, "specification_id": 10, "value": "Freestyle" },
        { "product_id": 7, "specification_id": 7, "value": "6S" },
        { "product_id": 7, "specification_id": 8, "value": "1300mAh" },
        { "product_id": 7, "specification_id": 3, "value": "22.2V" },
        { "product_id": 7, "specification_id": 9, "value": "XT60" },
        { "product_id": 7, "specification_id": 10, "value": "Racing / Freestyle" },
        { "product_id": 9, "specification_id": 2, "value": "10 g" },
        { "product_id": 9, "specification_id": 4, "value": "35x35 mm" },
        { "product_id": 9, "specification_id": 3, "value": "3-6S LiPo" },
        { "product_id": 9, "specification_id": 10, "value": "Control de vuelo" }
    ],

    productTagAssos: [
        { "tag_id": 1, "product_id": 1 },
        { "tag_id": 2, "product_id": 1 },
        { "tag_id": 3, "product_id": 1 },
        { "tag_id": 4, "product_id": 1 },
        { "tag_id": 9, "product_id": 1 },
        { "tag_id": 5, "product_id": 2 },
        { "tag_id": 3, "product_id": 2 },
        { "tag_id": 8, "product_id": 2 },
        { "tag_id": 4, "product_id": 3 },
        { "tag_id": 10, "product_id": 3 },
        { "tag_id": 9, "product_id": 3 },
        { "tag_id": 6, "product_id": 4 },
        { "tag_id": 11, "product_id": 4 },
        { "tag_id": 8, "product_id": 4 },
        { "tag_id": 7, "product_id": 5 },
        { "tag_id": 18, "product_id": 5 },
        { "tag_id": 8, "product_id": 5 },
        { "tag_id": 6, "product_id": 6 },
        { "tag_id": 8, "product_id": 6 },
        { "tag_id": 12, "product_id": 7 },
        { "tag_id": 9, "product_id": 7 },
        { "tag_id": 12, "product_id": 8 },
        { "tag_id": 8, "product_id": 8 },
        { "tag_id": 16, "product_id": 9 },
        { "tag_id": 9, "product_id": 9 },
        { "tag_id": 17, "product_id": 10 },
        { "tag_id": 8, "product_id": 10 },
        { "tag_id": 15, "product_id": 11 },
        { "tag_id": 8, "product_id": 11 },
        { "tag_id": 7, "product_id": 12 },
        { "tag_id": 9, "product_id": 13 },
        { "tag_id": 14, "product_id": 13 },
        { "tag_id": 4, "product_id": 14 },
        { "tag_id": 7, "product_id": 14 },
        { "tag_id": 8, "product_id": 14 },
        { "tag_id": 8, "product_id": 15 },
        { "tag_id": 19, "product_id": 16 },
        { "tag_id": 7, "product_id": 16 },
        { "tag_id": 20, "product_id": 17 },
        { "tag_id": 8, "product_id": 17 },
        { "tag_id": 13, "product_id": 18 },
        { "tag_id": 8, "product_id": 18 },
        { "tag_id": 7, "product_id": 19 },
        { "tag_id": 7, "product_id": 20 }
    ],

    coupons: [
        { "id": 1, "name": "Cupón basico", "disc_porcent": 10, "code": "basic1" }
    ]
};
