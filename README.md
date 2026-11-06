# DIVINE — E-Commerce & Gestión de Moda Sofisticada

<div align="center">

*Plataforma web full-stack desarrollada para boutique de indumentaria femenina con catálogo dinámico, base de datos SQLite y experiencia de usuario basada en componentes interactivos.*

</div>

---

## 📋 Descripción del Proyecto

**DIVINE** es una aplicación web de comercio electrónico orientada a la moda sastrera y de alta gama, diseñada bajo una estética minimalista en escala de grises. La plataforma prioriza la fluidez de navegación mediante drawers laterales deslizantes (Búsqueda, Carrito y Autenticación). El sistema integra un backend en Node.js con Express y almacenamiento en SQLite, optimizado para la gestión de inventario en tiempo real, validación estricta de formularios y procesamiento automatizado de compras.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3 (variables personalizadas, Flexbox, Grid), JavaScript (ES6+), Interfaz adaptativa (Responsive Web Design).
* **Backend:** Node.js, Express.js, CORS, middleware para procesamiento de payloads JSON.
* **Base de Datos:** SQLite3 (Persistencia de categorías, productos, variantes de talle/color y control de stock).
* **Entorno & Herramientas:** Git/GitHub, Live Server / Vite, Visual Studio Code.

---

## 📁 Estructura del Proyecto

```text
mi-proyecto/
│
├── backend/
│   └── server.js          # Servidor Express y endpoints de la API REST
│
├── frontend / root/
│   ├── index.html         # Página principal y estructura de drawers
│   ├── new-in.html        # Catálogo general y productos de la colección "New In"
│   ├── locales.html       # Directorio de tiendas físicas con filtro por provincia
│   ├── carrito.html       # Checkout y resumen detallado de la compra
│   ├── styles.css         # Hojas de estilo globales, drawers y notificaciones
│   ├── script.js          # Control de UI, drawers, API de búsqueda y persistencia
│   └── seed.js            # Script para crear y poblar la base de datos
│
├── images/                # Recursos audiovisuales y catálogo de prendas
├── divine.db              # Archivo de base de datos relacional SQLite
└── package.json           # Dependencias y scripts de Node.js
```

---

## ⚙️ Características y Funcionalidades

### 1. Base de Datos Relacional y Modelo de Productos
* **Estructura Normalizada:** Relaciones de claves foráneas entre `categories`, `products` y `product_variants`.
* **Control de Stock por Variantes:** Gestión independiente de talles (`S`, `M`, `L`) y stock asociado a cada prenda.
* **Script de Poblamiento (`seed.js`):** Sembrado automatizado con más de 110 productos categorizados (Blazers, Pantalones, Sets, Fiestas, New In, Destacados, etc.).

### 2. Drawer y Motor de Búsqueda Dinámica
* Peticiones en tiempo real conectadas al endpoint `/api/search` mediante SQL `LIKE`.
* Presentación de resultados dentro de un panel lateral deslizable.
* Previsualización de imagen completa (`object-fit: contain`), nombre y precio formateado en pesos argentinos ($).

### 3. Drawer de Autenticación y Notificaciones Elegantes
* Formularios integrados para inicio de sesión y creación de cuenta.
* Validación estricta para correos corporativos/personales del dominio Gmail (`@gmail.com`).
* Notificaciones flotantes tipo *Toast* personalizadas, reemplazando las ventanas de alerta por defecto del navegador.

### 4. Carrito Deslizable y Control de Inventario
* Acceso directo al resumen del carrito sin salir de la página actual.
* Contador dinámico en el encabezado (*badge*) persistido en `localStorage`.
* Modificación de subtotales y botón de redirección al flujo de checkout final.
* Endpoint `/api/checkout` que descuenta automáticamente el stock real en la base de datos tras confirmar una orden.

### 5. Buscador de Locales e Integración con Mapas
* Selector dinámico que filtra únicamente las provincias con sucursales activas (CABA, Buenos Aires, Neuquén, Salta).
* Enlaces directos a Google Maps y asistencia telefónica por WhatsApp para cada tienda.

---

## 🔌 API Endpoints Principales

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Devuelve la lista completa de productos. |
| `GET` | `/api/products/:id` | Devuelve la información detallada de un producto y sus variantes de talle/stock. |
| `GET` | `/api/search?q=:query` | Consulta la base de datos por coincidencias de texto en el nombre del producto. |
| `POST` | `/api/checkout` | Valida stock y procesa la compra deduciendo la cantidad comprada. |
| `POST` | `/api/admin/products` | Permite la inserción de un nuevo producto (Panel de administración). |
| `DELETE` | `/api/admin/products/:id` | Elimina un producto por ID. |

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para poner a funcionar el proyecto localmente:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/mi-proyecto.git
   cd mi-proyecto
   ```

2. **Instalar dependencias de Node.js**:
   ```bash
   cd backend
   npm install
   ```

3. **Ejecutar el script de Base de Datos**:
   *Asegúrate de ejecutarlo para crear el archivo `divine.db` con todas las tablas y prendas.*
   ```bash
   node seed.js
   ```

4. **Iniciar el Servidor Backend**:
   ```bash
   node server.js
   ```
   *El servidor quedará corriendo en `http://localhost:3000`.*

5. **Lanzar la Aplicación Frontend**:
   * Abre la carpeta principal en VS Code y lanza el frontend con la extensión **Live Server** o Vite (servido en `http://localhost:5173`).

---

## ✒️ Autor

Proyecto desarrollado como parte de la entrega de la materia Programación Web Dinámica por **Sofía Lencina & Medel Guadalupe**.