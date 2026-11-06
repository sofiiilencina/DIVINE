const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./divine.db');

db.serialize(() => {
    // Habilitar claves foráneas
    db.run("PRAGMA foreign_keys = ON");

    // 1. Crear categorías
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (1, 'BLAZERS', 'blazers')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (2, 'PANTALONES', 'pantalones')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (3, 'SETS Y COORDINADOS', 'sets_coordinados')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (4, 'CHAQUETAS', 'chaquetas')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (5, 'VESTIDOS Y MONOS', 'vestidos_monos')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (6, 'TEJIDOS', 'tejidos')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (7, 'CAMISAS Y BLUSAS', 'camisas_blusas')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (8, 'REMERAS Y TOPS', 'remeras_tops')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (9, 'POLLERAS Y SHORTS', 'polleras_shorts')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (10, 'JEANS', 'jeans')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (11, 'CALZADO', 'calzado')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (12, 'ACCESORIOS', 'accesorios')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (13, 'APROBADO X PAMPITA', 'aprobado_x_Pampita')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (14, 'LOOKS DE OFICINA', 'looks_de_oficina')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (15, 'BY CAMILA POGGI', 'by_Camila_Poggi')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (16, 'FIESTAS Y OCASIONES', 'fiestas_y_ocasiones')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (17, 'SHAPEWEAR', 'shapewear')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (18, 'NEW IN', 'new_in')`);
    db.run(`INSERT OR IGNORE INTO categories (id, name, slug) VALUES (19, 'DESTACADOS', 'destacados')`);

    // 2. Insertar Blazers (Categoría 1)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (1, 'BLAZER PRAGA', 'Blazer sastrero de diseño exclusivo', 360000, 1, 'images/blazers/blazer_praga1.webp', 'images/blazers/blazer_praga2.jpg', 1),
        (2, 'BLAZER DUBLÍN', 'Blazer clásico entallado', 290000, 1, 'images/blazers/blazer_dublin1.webp', 'images/blazers/blazer_dublin2.webp', 1),
        (3, 'BLAZER NAZARET', 'Blazer elegante con solapa', 290000, 1, 'images/blazers/blazer_nazaret1.webp', 'images/blazers/blazer_nazaret2.webp', 0),
        (4, 'BLAZER LUXOR', 'Blazer moderno y versátil', 290000, 1, 'images/blazers/blazer_luxor1.webp', 'images/blazers/blazer_luxor2.jpg', 0),
        (5, 'BLAZER MOST', 'Blazer estilo urbano', 275000, 1, 'images/blazers/blazer_most1.webp', 'images/blazers/blazer_most2.webp', 0),
        (6, 'BLAZER LAGOS', 'Blazer estructurado de alta calidad', 320000, 1, 'images/blazers/blazer_lagos1.webp', 'images/blazers/blazer_lagos2.webp', 1),
        (7, 'BLAZER OSAKA', 'Blazer liviano de temporada', 320000, 1, 'images/blazers/blazer_osaka1.webp', 'images/blazers/blazer_osaka2.jpg', 0),
        (8, 'BLAZER NICOSIA', 'Blazer sastrero sofisticado', 320000, 1, 'images/blazers/blazer_nicosia1.webp', 'images/blazers/blazer_nicosia2.webp', 0)
    `);

    // 3. Insertar Pantalones (Categoría 2)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (9, 'PANTALÓN GIRONA', 'Pantalón sastrero de diseño elegante', 220000, 2, 'images/pantalones/pantalon_girona1.webp', 'images/pantalones/pantalon_girona2.jpg', 1),
        (10, 'PANTALÓN TOULOUSE', 'Pantalón tiro alto de excelente caída', 260000, 2, 'images/new-in/pantalon_toulouse1.webp', 'images/new-in/pantalon_toulouse2.webp', 1),
        (11, 'PANTALÓN ZURICH', 'Pantalón formal de corte clásico', 220000, 2, 'images/new-in/pantalon_zurich1.png', 'images/new-in/pantalon_zurich2.webp', 0),
        (12, 'PANTALÓN BUSAN', 'Pantalón cómodo y versátil', 220000, 2, 'images/pantalones/pantalos_busan1.webp', 'images/pantalones/pantalos_busan2.webp', 0),
        (13, 'PANTALÓN NICOSIA', 'Pantalón sastrero sofisticado', 260000, 2, 'images/pantalones/pantalon_nicosia1.webp', 'images/pantalones/pantalon_nicosia2.webp', 0),
        (14, 'PANTALÓN DOHA', 'Pantalón liviano de temporada', 175000, 2, 'images/pantalones/pantalon_doha1.webp', 'images/pantalones/pantalon_doha2.webp', 0),
        (15, 'PANTALÓN QUEEN', 'Pantalón sastrero de diseño exclusivo', 175000, 2, 'images/pantalones/pantalon_queen1.webp', 'images/pantalones/pantalon_queen2.webp', 0),
        (16, 'PANTALÓN HARBOUR', 'Pantalón urbano moderno', 185000, 2, 'images/pantalones/pantalon_harbour1.webp', 'images/pantalones/pantalon_harbour2.webp', 0)
    `);

    // 4. Insertar Sets y Coordinados (Categoría 3)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (17, 'TOP CASCAIS', 'Top liviano de verano', 125000, 3, 'images/sets_coordinados/top_cascais1.webp', 'images/sets_coordinados/top_cascais2.jpg', 1),
        (18, 'POLLERA CASCAIS', 'Pollera a juego con diseño exclusivo', 195000, 3, 'images/sets_coordinados/pollera_cascais_detalle.jpg', 'images/sets_coordinados/top_cascais1.webp', 1),
        (19, 'SANDALIA CAROLINA', 'Sandalia fina de diseño elegante', 210000, 3, 'images/sets_coordinados/sandalia_carolina1.webp', 'images/sets_coordinados/sandalia_carolina2.webp', 0),
        (20, 'TOP CARTAGENA', 'Top sofisticado de temporada', 145000, 3, 'images/sets_coordinados/top_cartagena1.webp', 'images/sets_coordinados/top_cartagena2.jpg', 0),
        (21, 'PANTALÓN CARTAGENA', 'Pantalón fresco en combo', 149000, 3, 'images/sets_coordinados/pantalon_cartagena1.jpg', 'images/sets_coordinados/pantalon_cartagena2.jpg', 0),
        (22, 'SANDALIA MARGOT', 'Sandalia urbana cómoda', 210000, 3, 'images/sets_coordinados/sandalia_margot.webp', 'images/sets_coordinados/sandalia_margot.webp', 0)
    `);

    // 5. Insertar Chaquetas (Categoría 4)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (23, 'CHAQUETA REUS', 'Chaqueta ligera de diseño urbano', 179000, 4, 'images/chaquetas/chaqueta_reus1.webp', 'images/chaquetas/chaqueta_reus2.webp', 1),
        (24, 'CHAQUETA LONDRES', 'Chaqueta sastrera abrigada', 260000, 4, 'images/chaquetas/chaqueta_londres1.webp', 'images/chaquetas/chaqueta_londres2.webp', 1),
        (25, 'CHAQUETA MALIA', 'Chaqueta de corte moderno', 230000, 4, 'images/chaquetas/chaqueta_malia1.webp', 'images/chaquetas/chaqueta_malia2.jpg', 0),
        (26, 'CHAQUETA TRENTO', 'Chaqueta elegante de temporada', 230000, 4, 'images/chaquetas/chaqueta_trento1.webp', 'images/chaquetas/chaqueta_trento2.jpg', 0)
    `);

    // 6. Insertar Vestidos | Monos (Categoría 5)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (27, 'VESTIDO AVEIRO', 'Vestido elegante de diseño exclusivo', 260000, 5, 'images/vestidos/vestido_aveiro1.webp', 'images/vestidos/vestido_aveiro2.webp', 1),
        (28, 'VESTIDO HARPER', 'Vestido sofisticado para ocasiones especiales', 260000, 5, 'images/vestidos/vestido_harper1.webp', 'images/vestidos/vestido_harper2.webp', 1),
        (29, 'VESTIDO JERICÓ', 'Vestido casual de corte fluido', 190000, 5, 'images/vestidos/vestido_jericó1.webp', 'images/vestidos/vestido_jericó2.webp', 0),
        (30, 'VESTIDO LUCCA', 'Vestido ligero con detalles delicados', 180000, 5, 'images/vestidos/vestido_lucca1.webp', 'images/vestidos/vestido_lucca2.webp', 0),
        (31, 'VESTIDO RONDA', 'Vestido versátil de uso diario', 170000, 5, 'images/vestidos/vestido_ronda1.webp', 'images/vestidos/vestido_ronda2.webp', 0),
        (32, 'MONO HAMBURGO', 'Mono sastre cómodo y moderno', 175000, 5, 'images/vestidos/mono_hamburgo1.webp', 'images/vestidos/mono_hamburgo2.webp', 0),
        (33, 'MONO PALMA', 'Mono de alta gama con diseño exclusivo', 320000, 5, 'images/vestidos/mono_palma1.webp', 'images/vestidos/mono_palma2.webp', 1),
        (34, 'VESTIDO SEÚL', 'Vestido de tendencia con acabado suave', 185000, 5, 'images/vestidos/vestido_seúl1.webp', 'images/vestidos/vestido_seúl2.jpg', 0)
    `);

    // 7. Insertar Tejidos (Categoría 6)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (35, 'POLLERA GALLE', 'Pollera tejida de textura suave', 120000, 6, 'images/tejidos/pollera_galle1.webp', 'images/tejidos/pollera_galle2.jpg', 0),
        (36, 'TOP GALLE', 'Top tejido cómodo y adaptable', 95000, 6, 'images/tejidos/top_galle1.jpg', 'images/tejidos/top_galle2.jpg', 0),
        (37, 'VESTIDO GANTE', 'Vestido tejido de abrigo liviano', 165000, 6, 'images/tejidos/vestido_gante1.webp', 'images/tejidos/vestido_gante2.webp', 1),
        (38, 'VESTIDO KOLDING', 'Vestido tejido clásico de temporada', 145000, 6, 'images/tejidos/vestido_kolding1.webp', 'images/tejidos/vestido_kolding2.jpg', 0)
    `);

    // 8. Insertar Camisas | Blusas (Categoría 7)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (39, 'BLUSA LINDI', 'Blusa elegante de diseño sofisticado', 145000, 7, 'images/camisas_blusas/blusa_lindi1.webp', 'images/camisas_blusas/blusa_lindi2.webp', 0),
        (40, 'BLUSA LINZ', 'Blusa ligera de corte fluido', 125000, 7, 'images/camisas_blusas/blusa_linz1.webp', 'images/camisas_blusas/blusa_linz2.webp', 0),
        (41, 'BLUSA LISBOA', 'Blusa básica versátil', 110000, 7, 'images/camisas_blusas/blusa_lisboa1.webp', 'images/camisas_blusas/blusa_lisboa2.webp', 0),
        (42, 'CAMISA KAUNAS', 'Camisa sastre de calidad premium', 155000, 7, 'images/camisas_blusas/camisa_kaunas1.jpg', 'images/camisas_blusas/camisa_kaunas2.jpg', 1),
        (43, 'CAMISA KITTY', 'Camisa casual de diseño moderno', 125000, 7, 'images/camisas_blusas/camisa_kitty1.webp', 'images/camisas_blusas/camisa_kitty2.jpg', 0),
        (44, 'CAMISA MENDOZA', 'Camisa clásica de algodón', 110000, 7, 'images/camisas_blusas/camisa_mendoza1.webp', 'images/camisas_blusas/camisa_mendoza2.webp', 0),
        (45, 'CAMISA MOSTAR', 'Camisa de corte elegante', 145000, 7, 'images/camisas_blusas/camisa_mostar1.webp', 'images/camisas_blusas/camisa_mostar2.webp', 0),
        (46, 'CAMISA ZENICA', 'Camisa liviana de uso diario', 110000, 7, 'images/camisas_blusas/camisa_zenica1.webp', 'images/camisas_blusas/camisa_zenica2.webp', 0)
    `);

    // 9. Insertar Remeras | Tops (Categoría 8)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (47, 'REMERA OVIEDO', 'Remera básica de algodón suave', 80000, 8, 'images/remeras_tops/remera_oviedo1.webp', 'images/remeras_tops/remera_oviedo2.webp', 0),
        (48, 'REMERA SHIROKI', 'Remera de diseño exclusivo', 105000, 8, 'images/remeras_tops/remera_shiroki1.jpg', 'images/remeras_tops/remera_shiroki2.jpg', 0),
        (49, 'REMERA SPOLETO', 'Remera cómoda de corte moderno', 95000, 8, 'images/remeras_tops/remera_spoleto1.webp', 'images/remeras_tops/remera_spoleto2.jpg', 0),
        (50, 'REMERA TRIESTE', 'Remera casual de gran calce', 90000, 8, 'images/remeras_tops/remera_trieste1.webp', 'images/remeras_tops/remera_trieste2.jpg', 0),
        (51, 'TOP BARCELONA', 'Top básico versátil', 70000, 8, 'images/remeras_tops/top_barcelona1.webp', 'images/remeras_tops/top_barcelona2.webp', 0),
        (52, 'TOP LUCERNA', 'Top de diseño sofisticado', 129000, 8, 'images/remeras_tops/top_lucerna1.webp', 'images/remeras_tops/top_lucerna2.webp', 1),
        (53, 'TOP MIKKELI', 'Top moderno de tiras finas', 95000, 8, 'images/remeras_tops/top_mikkeli1.webp', 'images/remeras_tops/top_mikkeli2.webp', 0),
        (54, 'TOP PUEBLA', 'Top elegante para salir', 115000, 8, 'images/remeras_tops/top_puebla1.webp', 'images/remeras_tops/top_puebla2.jpg', 0)
    `);

    // 10. Insertar Polleras | Shorts (Categoría 9)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (55, 'POLLERA BOGOTÁ', 'Pollera midi de corte sastre', 135000, 9, 'images/polleras_shorts/pollera_bogota1.webp', 'images/polleras_shorts/pollera_bogota2.jpg', 1),
        (56, 'POLLERA CUENCA', 'Pollera corta de diseño fresco', 120000, 9, 'images/polleras_shorts/pollera_cuenca1.webp', 'images/polleras_shorts/pollera_cuenca2.webp', 0),
        (57, 'SHORT ZETA', 'Short sastre de tiro alto', 135000, 9, 'images/polleras_shorts/short_zeta1.webp', 'images/polleras_shorts/short_zeta2.webp', 0),
        (58, 'SKORT CORVUS', 'Pollera pantalón de diseño exclusivo', 165000, 9, 'images/polleras_shorts/skort_corvus1.webp', 'images/polleras_shorts/skort_corvus2.webp', 1)
    `);

    // 11. Insertar Jeans (Categoría 10)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (59, 'JEAN BELL', 'Jean clásico de calce perfecto', 145000, 10, 'images/jeans/jean_bell1.webp', 'images/jeans/jean_bell2.webp', 0),
        (60, 'JEAN BERLIN', 'Jean de tendencia con lavado exclusivo', 175000, 10, 'images/jeans/jean_berlin1.webp', 'images/jeans/jean_berlin2.jpg', 1),
        (61, 'JEAN JERÉZ', 'Jean cómodo de uso diario', 155000, 10, 'images/jeans/jean_jerez1.webp', 'images/jeans/jean_jerez2.webp', 0),
        (62, 'JEAN LINZ', 'Jean sastre de denim premium', 165000, 10, 'images/jeans/jean_linz1.webp', 'images/jeans/jean_linz2.webp', 0),
        (63, 'JEAN MANCORA', 'Jean de alta calidad y diseño moderno', 190000, 10, 'images/jeans/jean_mancora1.webp', 'images/jeans/jean_mancora2.webp', 1),
        (64, 'JEAN PRAT', 'Jean de corte exclusivo', 190000, 10, 'images/jeans/jean_prat1.jpg', 'images/jeans/jean_prat2.jpg', 0),
        (65, 'JEAN SELINA', 'Jean versátil de excelente calce', 165000, 10, 'images/jeans/jean_selina1.webp', 'images/jeans/jean_selina2.webp', 0),
        (66, 'JEAN TOLEDO', 'Jean clásico renovado', 170000, 10, 'images/jeans/jean_toledo1.webp', 'images/jeans/jean_toledo2.jpg', 0)
    `);

    // 12. Insertar Calzado (Categoría 11)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (67, 'STILETTO MALMO', 'Stiletto clásico de diseño elegante', 195000, 11, 'images/calzados/stiletto_malmo1.webp', 'images/calzados/stiletto_malmo2.jpg', 1),
        (68, 'STILETTO JIL', 'Stiletto fino de gran comodidad', 195000, 11, 'images/calzados/stiletto_jil1.webp', 'images/calzados/stiletto_jil2.webp', 0),
        (69, 'SANDALIA MARGOT', 'Sandalia elegante para eventos', 210000, 11, 'images/calzados/sandalia_margot1.webp', 'images/calzados/sandalia_margot2.jpg', 1),
        (70, 'STILETTO LUGO', 'Stiletto sofisticado de temporada', 195000, 11, 'images/calzados/stiletto_lugo1.webp', 'images/calzados/stiletto_lugo2.webp', 0)
    `);

    // 13. Insertar Accesorios (Categoría 12)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (71, 'CHALINA MIA', 'Chalina suave de gran abrigo', 32000, 12, 'images/accesorios/chalina_mia1.jpg', 'images/accesorios/chalina_mia2.webp', 0),
        (72, 'CHALINA OLI', 'Chalina ligera y versátil', 32000, 12, 'images/accesorios/chalina_oli1.jpg', 'images/accesorios/chalina_oli2.webp', 0),
        (73, 'CINTO FRIDO', 'Cinto de diseño moderno', 35000, 12, 'images/accesorios/cinto_frido1.webp', 'images/accesorios/cinto_frido2.webp', 0),
        (74, 'CINTO WITT', 'Cinto clásico de ecocuero', 32000, 12, 'images/accesorios/cinto_witt1.webp', 'images/accesorios/cinto_witt2.webp', 0),
        (75, 'KIMONO MARRAKECH', 'Kimono estampado de diseño exclusivo', 50000, 12, 'images/accesorios/kimono_marrakech1.webp', 'images/accesorios/kimono_marrakech2.jpg', 1),
        (76, 'PAÑUELO COPACABANA', 'Pañuelo delicado de textura suave', 35000, 12, 'images/accesorios/pañuelo_copacabana1.webp', 'images/accesorios/pañuelo_copacabana2.webp', 0)
    `);

    // 14. Insertar Aprobado x Pampita (Categoría 13)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (77, 'BLAZER NEO', 'Blazer sastre exclusivo seleccionado por Pampita', 275000, 13, 'images/aprobado_x_pampita/blazer_neo1.webp', 'images/aprobado_x_pampita/blazer_neo2.jpg', 1),
        (78, 'PANTALÓN NEO', 'Pantalón sastre de diseño impecable', 210000, 13, 'images/aprobado_x_pampita/pantalon_neo1.webp', 'images/aprobado_x_pampita/pantalon_neo2.webp', 0),
        (79, 'CHALECO SORIA', 'Chaleco sastre de tendencia', 220000, 13, 'images/aprobado_x_pampita/chaleco_soria1.webp', 'images/aprobado_x_pampita/chaleco_soria2.jpg', 0),
        (80, 'PANTALÓN SORIA', 'Pantalón de corte elegante', 235000, 13, 'images/aprobado_x_pampita/pantalon_soria1.webp', 'images/aprobado_x_pampita/pantalon_soria2.jpg', 1),
        (81, 'PANTALÓN DIJÓN', 'Pantalón cómodo de gran calce', 125000, 13, 'images/aprobado_x_pampita/pantalon_dijon1.jpg', 'images/aprobado_x_pampita/pantalon_dijon2.jpg', 0),
        (82, 'TOP DIJÓN', 'Top versátil y moderno', 110000, 13, 'images/aprobado_x_pampita/top_dijon1.jpg', 'images/aprobado_x_pampita/top_dijon2.jpg', 0),
        (83, 'PANTALÓN OSAKA', 'Pantalón sastre de alta calidad', 220000, 13, 'images/aprobado_x_pampita/pantalon_osaka1.webp', 'images/aprobado_x_pampita/pantalon_osaka2.jpg', 0),
        (84, 'TOP OSAKA', 'Top sofisticado de diseño exclusivo', 165000, 13, 'images/aprobado_x_pampita/top_osaka1.webp', 'images/aprobado_x_pampita/top_osaka2.webp', 0)
    `);

    // 15. Insertar Looks de Oficina (Categoría 14)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (85, 'BLAZER UTRECHT', 'Blazer estructurado ideal para oficina', 265000, 14, 'images/looks_oficina/blazer_utrecht1.webp', 'images/looks_oficina/blazer_utrecht2.webp', 1),
        (86, 'PANTALÓN UTRECHT', 'Pantalón sastre formal', 165000, 14, 'images/looks_oficina/pantalon_utrecht1.webp', 'images/looks_oficina/pantalon_utrecht2.webp', 0),
        (87, 'TOP HERNING', 'Top elegante para combinar', 105000, 14, 'images/looks_oficina/top_herning1.webp', 'images/looks_oficina/top_herning2.webp', 0),
        (88, 'VESTIDO CALI', 'Vestido midi formal', 145000, 14, 'images/looks_oficina/vestido_cali1.webp', 'images/looks_oficina/vestido_cali2.webp', 1)
    `);

    // 16. Insertar By Camila Poggi (Categoría 15)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (89, 'CHALECO ALMERE', 'Chaleco de diseño exclusivo by Cami Poggi', 165000, 15, 'images/by_cami_poggi/chaleco_almere1.jpg', 'images/by_cami_poggi/chaleco_almere2.webp', 1),
        (90, 'PANTALÓN ALMERE', 'Pantalón sastre a juego', 175000, 15, 'images/by_cami_poggi/pantalon_almere1.webp', 'images/by_cami_poggi/pantalon_almere2.webp', 0),
        (91, 'CHALECO TUNDER', 'Chaleco moderno de tendencia', 180000, 15, 'images/by_cami_poggi/chaleco_tunder1.webp', 'images/by_cami_poggi/chaleco_tunder2.webp', 0),
        (92, 'TOP PARMA', 'Top elegante de corte exclusivo', 110000, 15, 'images/by_cami_poggi/top_parma1.webp', 'images/by_cami_poggi/top_parma2.jpg', 0)
    `);

    // 17. Insertar Fiestas y Ocasiones (Categoría 16)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (93, 'TOP RANDERS', 'Top de noche con detalles delicados', 125000, 16, 'images/looks_noche/top_randers1.jpg', 'images/looks_noche/top_randers2.jpg', 0),
        (94, 'PANTALÓN RANDERS', 'Pantalón de fiesta de alta costura', 260000, 16, 'images/looks_noche/pantalon_randers1.webp', 'images/looks_noche/pantalon_randers2.jpg', 1),
        (95, 'MONO CESIS', 'Mono elegante para eventos nocturnos', 240000, 16, 'images/looks_noche/mono_cesis1.webp', 'images/looks_noche/mono_cesis2.jpg', 1),
        (96, 'POLLERA GUADALAJARA', 'Pollera de fiesta con gran caída', 135000, 16, 'images/looks_noche/pollera_guadalajara1.webp', 'images/looks_noche/pollera_guadalajara2.webp', 0),
        (97, 'TOP GATSBY', 'Top de diseño sofisticado para noche', 125000, 16, 'images/looks_noche/top_gatsby1.webp', 'images/looks_noche/top_gatsby2.jpg', 0)
    `);

    // 18. Insertar Shapewear (Categoría 17)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (98, 'MUSCULOSA DINA', 'Musculosa moldeadora de compresión suave', 100000, 17, 'images/shapewear/musculosa_dina1.webp', 'images/shapewear/musculosa_dina2.jpg', 0),
        (99, 'MUSCULOSA ROMA', 'Musculosa invisible de control', 100000, 17, 'images/shapewear/musculosa_roma1.webp', 'images/shapewear/musculosa_roma2.webp', 0),
        (100, 'SHORT KIM', 'Short moldeador de alta sujeción', 70000, 17, 'images/shapewear/short_kim1.webp', 'images/shapewear/short_kim2.webp', 0)
    `);

    // 19. Insertar Productos de la sección DESTACADOS (Categoría 19)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (101, 'VESTIDO DURBUY', 'Vestido exclusivo de temporada', 185000, 19, 'images/vestido_durbuy1.webp', 'images/vestido_durbuy2.webp', 1),
        (102, 'VESTIDO KOLDING', 'Vestido tejido clásico', 145000, 19, 'images/vestido_kolding1.webp', 'images/vestido_kolding2.jpg', 1),
        (103, 'BLAZER CORVUS', 'Blazer estructurado de alta calidad', 320000, 19, 'images/blazer_corvus1.jpg', 'images/blazer_corvus2.webp', 1),
        (104, 'POLLERA TAIPEI', 'Pollera midi de diseño exclusivo', 125000, 19, 'images/pollera_taipei1.webp', 'images/pollera_taipei2.webp', 1)
    `);

    // 20. Insertar Productos de la sección NEW IN (Categoría 18)
    db.run(`INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_first, image_second, is_featured) VALUES 
        (105, 'BLAZER TOULOUSE', 'Blazer sastrero de diseño exclusivo', 360000, 18, 'images/new-in/blazer_toulouse1.webp', 'images/new-in/blazer_toulouse2.webp', 1),
        (106, 'PANTALÓN TOULOUSE', 'Pantalón tiro alto de excelente caída', 260000, 18, 'images/new-in/pantalon_toulouse1.webp', 'images/new-in/pantalon_toulouse2.webp', 1),
        (107, 'PANTALÓN ZURICH', 'Pantalón formal de corte clásico', 220000, 18, 'images/new-in/pantalon_zurich1.png', 'images/new-in/pantalon_zurich2.webp', 1),
        (108, 'TOP ZURICH', 'Top elegante de temporada', 125000, 18, 'images/new-in/top_zurich1.webp', 'images/new-in/top_zurich2.webp', 0),
        (109, 'POLLERA TAIPEI', 'Pollera midi de diseño exclusivo', 125000, 18, 'images/pollera_taipei1.webp', 'images/pollera_taipei2.webp', 0),
        (110, 'TOP TAIPEI', 'Top moderno y versátil', 85000, 18, 'images/new-in/top_taipei1.webp', 'images/new-in/top_taipei2.webp', 0),
        (111, 'VESTIDO MANCHESTER', 'Vestido sofisticado para ocasiones especiales', 235000, 18, 'images/new-in/vestido_manchester1.webp', 'images/new-in/vestido_manchester2.webp', 1),
        (112, 'BLUSA TOULOUSE', 'Blusa ligera de corte fluido', 220000, 18, 'images/new-in/blusa_toulouse1.jpg', 'images/new-in/blusa_toulouse2.webp', 0)
    `);

    // 21. Generar stock y talles (S, M, L) para estos nuevos productos (del 101 al 112)
    const variantsQueryNew = `INSERT OR IGNORE INTO product_variants (product_id, size, color, stock) VALUES (?, ?, 'Único', 10)`;
    const stmtNew = db.prepare(variantsQueryNew);
    
    for (let i = 101; i <= 112; i++) {
        stmtNew.run(i, 'S');
        stmtNew.run(i, 'M');
        stmtNew.run(i, 'L');
    }
    stmtNew.finalize();
});

db.close(() => {
    console.log('¡Base de datos cargada por completo con todas las categorías y productos!');
});