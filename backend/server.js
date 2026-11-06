const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conectar o crear la base de datos SQLite local
const db = new sqlite3.Database('./divine.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

db.serialize(() => {
    // Habilitar claves foráneas en SQLite
    db.run("PRAGMA foreign_keys = ON");

    // 1. Tabla de Categorías
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE
        )
    `);

    // 2. Tabla de Productos
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category_id INTEGER,
            image_first TEXT NOT NULL,
            image_second TEXT NOT NULL,
            is_featured BOOLEAN DEFAULT 0,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    `);

    // 3. Tabla de Variantes (Talles, Colores y Stock)
    db.run(`
        CREATE TABLE IF NOT EXISTS product_variants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            size TEXT NOT NULL,
            color TEXT NOT NULL,
            stock INTEGER DEFAULT 0,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `);

    // Insertar un producto de prueba (ID 1) si no existe
    db.run(`
        INSERT OR IGNORE INTO products (id, name, description, price, image_first, image_second) 
        VALUES (1, 'Blazer Praga', 'Blazer sastrero de lino', 360000, 'images/blazers/blazer_praga1.webp', 'images/blazers/blazer_praga2.jpg')
    `);

    // Insertar variantes de prueba para el producto 1
    db.run(`INSERT OR IGNORE INTO product_variants (product_id, size, color, stock) VALUES (1, 'S', 'Único', 5)`);
    db.run(`INSERT OR IGNORE INTO product_variants (product_id, size, color, stock) VALUES (1, 'M', 'Único', 5)`);
});

// RUTA API: BUSCADOR DE PRODUCTOS (Lupita) - Devuelve todos los coincidentes
app.get('/api/search', (req, res) => {
    const query = req.query.q || '';
    const sql = `SELECT id, name, price, image_first AS image FROM products WHERE name LIKE ?`;
    
    db.all(sql, [`%${query}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Ruta API para listar todos los productos
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ products: rows });
    });
});

// Ruta API para obtener un producto específico por ID junto con sus variantes
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const productQuery = `SELECT * FROM products WHERE id = ?`;
    const variantsQuery = `SELECT * FROM product_variants WHERE product_id = ?`;

    db.get(productQuery, [productId], (err, product) => {
        if (err || !product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        db.all(variantsQuery, [productId], (err, variants) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ ...product, variants });
        });
    });
});

// Ruta para procesar la compra y descontar stock real de la base de datos
app.post('/api/checkout', (req, res) => {
  const items = req.body.items;
  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'El carrito está vacío' });
  }

  let stockError = false;
  db.serialize(() => {
    let checked = 0;
    items.forEach(item => {
      db.get(`SELECT stock FROM product_variants WHERE product_id = ? AND size = ?`, [item.id, item.size], (err, row) => {
        checked++;
        if (err || !row || row.stock < item.quantity) {
          stockError = true;
        }
        if (checked === items.length) {
          if (stockError) {
            return res.json({ success: false, message: 'Lo sentimos, no hay suficiente stock disponible para algunos de los productos.' });
          }
          items.forEach(prod => {
            db.run(`UPDATE product_variants SET stock = stock - ? WHERE product_id = ? AND size = ?`, [prod.quantity, prod.id, prod.size]);
          });
          res.json({ success: true, message: '¡Compra realizada con éxito!' });
        }
      });
    });
  });
});

// CRUD: Crear producto desde el panel de administración
app.post('/api/admin/products', (req, res) => {
  const { name, description, price, category_id, image_first, image_second } = req.body;
  const query = `INSERT INTO products (name, description, price, category_id, image_first, image_second) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, description, price, category_id, image_first, image_second], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    const prodId = this.lastID;
    // Generar stock inicial por defecto para S, M y L
    db.run(`INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, 'S', 'Único', 10)`, [prodId]);
    db.run(`INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, 'M', 'Único', 10)`, [prodId]);
    db.run(`INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, 'L', 'Único', 10)`, [prodId]);
    res.json({ message: 'Producto creado con éxito', id: prodId });
  });
});

// CRUD: Eliminar producto
app.delete('/api/admin/products/:id', (req, res) => {
  db.run(`DELETE FROM products WHERE id = ?`, req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto eliminado con éxito' });
  });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

