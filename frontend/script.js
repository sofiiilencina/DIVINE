// ===== DIVINE — JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

  // 1. Año automático en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Inicialización Swiper: Hero Banner
  const heroSwiper = new Swiper('.landing-hero-slider', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.js-hero-pagination',
      clickable: true,
    },
  });

  // 3. Inicialización Swiper: Productos Destacados
  const skuSwiper = new Swiper('.js-sku-carousel__slider', {
    slidesPerView: 1.2,
    spaceBetween: 15,
    breakpoints: {
      640: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3.2,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });

  // 4. Validación del Newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('email');
  const newsletterError = document.getElementById('newsletterError');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailValue = newsletterEmail.value.trim();

      if (!emailValue || !emailValue.includes('@')) {
        newsletterError.textContent = 'Por favor, ingresa un correo electrónico válido.';
        newsletterError.style.color = '#a33';
      } else {
        newsletterError.textContent = '¡Gracias por suscribirte a DIVINE!';
        newsletterError.style.color = '#2d7a42';
        newsletterEmail.value = '';
      }
    });
  }

  // 5. Menú Mobile Toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.main-navigation');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      if (nav.style.display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#ffffff';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
      }
    });
  }

});

// ===== LÓGICA DESPLEGABLES TOOLBAR =====
document.addEventListener('DOMContentLoaded', () => {
  const btnFiltros = document.getElementById('btnFiltros');
  const panelFiltros = document.getElementById('panelFiltros');
  const btnSort = document.getElementById('btnSort');
  const panelSort = document.getElementById('panelSort');

  if (btnFiltros && panelFiltros) {
    btnFiltros.addEventListener('click', (e) => {
      e.stopPropagation();
      if (panelSort) panelSort.classList.remove('open');
      panelFiltros.classList.toggle('open');
    });
  }

  if (btnSort && panelSort) {
    btnSort.addEventListener('click', (e) => {
      e.stopPropagation();
      if (panelFiltros) panelFiltros.classList.remove('open');
      panelSort.classList.toggle('open');
    });
  }

  document.addEventListener('click', () => {
    if (panelFiltros) panelFiltros.classList.remove('open');
    if (panelSort) panelSort.classList.remove('open');
  });

  if (panelFiltros) {
    panelFiltros.addEventListener('click', (e) => e.stopPropagation());
  }

  const sortOptions = document.querySelectorAll('.sort-option');
  const selectedSortText = document.getElementById('selectedSortText');

  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      sortOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      if (selectedSortText) {
        selectedSortText.textContent = option.getAttribute('data-sort');
      }
      if (panelSort) panelSort.classList.remove('open');
    });
  });
});

// ===== LÓGICA VER MÁS / VER MENOS EN FILTROS =====
document.addEventListener('DOMContentLoaded', () => {
  const toggleColors = document.getElementById('toggleColors');
  const extraColors = document.getElementById('extraColors');

  if (toggleColors && extraColors) {
    toggleColors.addEventListener('click', (e) => {
      e.preventDefault();
      extraColors.classList.toggle('show');
      toggleColors.textContent = extraColors.classList.contains('show') ? 'ver menos' : 'ver más';
    });
  }

  const toggleSizes = document.getElementById('toggleSizes');
  const extraSizes = document.getElementById('extraSizes');

  if (toggleSizes && extraSizes) {
    toggleSizes.addEventListener('click', (e) => {
      e.preventDefault();
      extraSizes.classList.toggle('show');
      toggleSizes.textContent = extraSizes.classList.contains('show') ? 'ver menos' : 'ver más';
    });
  }
});

// ===== LÓGICA DINÁMICA DE PRODUCTO Y CARRITO =====
document.addEventListener('DOMContentLoaded', () => {
  // Cargar contador inicial del carrito al abrir cualquier página
  const carritoGuardado = JSON.parse(localStorage.getItem('cart')) || [];
  const contadorCarrito = document.querySelector('.cart-size');
  if (contadorCarrito && carritoGuardado.length > 0) {
    const totalItems = carritoGuardado.reduce((sum, item) => sum + item.quantity, 0);
    contadorCarrito.textContent = totalItems;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (productId) {
    fetch(`http://localhost:3000/api/products/${productId}`)
      .then(response => {
        if (!response.ok) throw new Error('No se pudo obtener el producto');
        return response.json();
      })
      .then(product => {
        const imgFirst = document.querySelector('.producto-img-principal');
        const imgSecond = document.querySelector('.producto-img-secundaria');
        
        if (imgFirst && product.image_first) imgFirst.src = product.image_first;
        if (imgSecond && product.image_second) imgSecond.src = product.image_second;

        const nameEl = document.querySelector('.producto-nombre');
        const priceEl = document.querySelector('.producto-precio');
        if (nameEl) nameEl.textContent = product.name;
        if (priceEl) priceEl.textContent = `$${Number(product.price).toLocaleString('es-AR')}`;

        const descEl = document.querySelector('.producto-descripcion');
        if (descEl) {
          descEl.textContent = product.description;
        } else if (priceEl && product.description) {
          const p = document.createElement('p');
          p.className = 'producto-descripcion';
          p.style.color = '#555';
          p.style.fontSize = '14px';
          p.style.lineHeight = '1.5';
          p.textContent = product.description;
          priceEl.after(p);
        }

        const talleContainer = document.querySelector('.talles-container');
        if (talleContainer && product.variants) {
          talleContainer.innerHTML = '';
          const unicosTalles = [...new Set(product.variants.map(v => v.size))];
          
          unicosTalles.forEach(size => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'talle-btn';
            btn.textContent = size;
            
            btn.addEventListener('click', () => {
              document.querySelectorAll('.talle-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
            });

            talleContainer.appendChild(btn);
          });
        }

       const btnComprar = document.querySelector('.btn-comprar');
        if (btnComprar) {
          btnComprar.onclick = () => {
            const talleSeleccionado = document.querySelector('.talle-btn.active');
            if (!talleSeleccionado) {
              mostrarAviso('Por favor, selecciona un talle antes de comprar.');
              return;
            }

            let carrito = JSON.parse(localStorage.getItem('cart')) || [];
            
            const itemCarrito = {
              id: product.id,
              name: product.name,
              price: product.price,
              size: talleSeleccionado.textContent,
              image: product.image_first,
              quantity: 1
            };

            const existingIndex = carrito.findIndex(item => item.id === itemCarrito.id && item.size === itemCarrito.size);
            const cantidadActual = existingIndex > -1 ? carrito[existingIndex].quantity : 0;

            // Validación de stock máximo (10 unidades)
            if (cantidadActual + 1 > 10) {
              mostrarAviso('Lo sentimos, no tenemos esa cantidad disponible ahora (máx. 10)');
              return;
            }

            if (existingIndex > -1) {
              carrito[existingIndex].quantity += 1;
            } else {
              carrito.push(itemCarrito);
            }

            localStorage.setItem('cart', JSON.stringify(carrito));

            const contador = document.querySelector('.cart-size');
            if (contador) {
              const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
              contador.textContent = totalItems;
            }

            mostrarAviso('¡Producto agregado al carrito!');
          };
        }
      })
      .catch(error => console.error('Error al cargar los detalles del producto:', error));
  }
});

// ===== CONTROL DEL SIDEBAR DEL CARRITO (GLOBAL) =====
function renderCartItems() {
  const container = document.querySelector('.cart-items-container');
  const totalPriceEl = document.querySelector('.cart-total-price');
  const carrito = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (container) {
    container.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
      container.innerHTML = '<p style="text-align:center; color:#666; padding: 30px 0;">Tu carrito está vacío.</p>';
      if (totalPriceEl) totalPriceEl.textContent = '$0';
      return;
    }

    carrito.forEach((item, index) => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image || ''}" alt="${item.name}">
        <div class="cart-item-details">
          <p style="font-size: 10px; color: #888; margin-bottom: 2px;">IN STOCK</p>
          <h4>${item.name}</h4>
          <p>Talle: ${item.size}</p>
          <p>Cont: ${item.quantity}</p>
          <p style="font-weight: 600; margin-top: 4px;">$${Number(item.price * item.quantity).toLocaleString('es-AR')}</p>
        </div>
        <button class="cart-delete-btn" onclick="eliminarDelCarrito(${index})" title="Eliminar">&#128465;</button>
      `;
      container.appendChild(div);
    });

    if (totalPriceEl) {
      totalPriceEl.textContent = `$${Number(total).toLocaleString('es-AR')}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');

  if (cartIcon && cartSidebar && cartOverlay) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      renderCartItems();
      cartSidebar.classList.add('open');
      cartOverlay.classList.add('open');
    });
  }

  if (closeCart && cartSidebar && cartOverlay) {
    closeCart.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
      cartOverlay.classList.remove('open');
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
      cartOverlay.classList.remove('open');
    });
  }

  const btnIrAlCarrito = document.querySelector('.btn-checkout');
  if (btnIrAlCarrito) {
    btnIrAlCarrito.textContent = 'IR AL CARRITO';
    btnIrAlCarrito.onclick = () => {
      window.location.href = 'carrito.html';
    };
  }
});

// Función global para eliminar ítems y actualizar al instante
window.eliminarDelCarrito = function(index) {
  let carrito = JSON.parse(localStorage.getItem('cart')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(carrito));
  
  const contador = document.querySelector('.cart-size');
  if (contador) {
    const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
    contador.textContent = totalItems;
  }

  renderCartItems();
};

// Función para mostrar el aviso minimalista flotante
function mostrarAviso(mensaje) {
  let toast = document.querySelector('.divine-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'divine-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ==========================================
// CONTROL DE DRAWERS LATERALES (BÚSQUEDA, LOGIN Y CARRITO)
// ==========================================

function abrirSearchDrawer() {
  const searchDrawer = document.getElementById('searchDrawer');
  const authDrawer = document.getElementById('authDrawer');
  const cartDrawer = document.getElementById('cartDrawer');
  const globalOverlay = document.getElementById('globalOverlay');

  if (searchDrawer) searchDrawer.classList.add('open');
  if (authDrawer) authDrawer.classList.remove('open');
  if (cartDrawer) cartDrawer.classList.remove('open');
  if (globalOverlay) globalOverlay.classList.add('open');
  
  const inputSearch = document.getElementById('inputBuscadorGlobal');
  if (inputSearch) inputSearch.focus();
}

function cerrarSearchDrawer() {
  const searchDrawer = document.getElementById('searchDrawer');
  const globalOverlay = document.getElementById('globalOverlay');

  if (searchDrawer) searchDrawer.classList.remove('open');
  if (globalOverlay) globalOverlay.classList.remove('open');
}

function abrirAuthDrawer() {
  const authDrawer = document.getElementById('authDrawer');
  const searchDrawer = document.getElementById('searchDrawer');
  const cartDrawer = document.getElementById('cartDrawer');
  const globalOverlay = document.getElementById('globalOverlay');

  if (authDrawer) authDrawer.classList.add('open');
  if (searchDrawer) searchDrawer.classList.remove('open');
  if (cartDrawer) cartDrawer.classList.remove('open');
  if (globalOverlay) globalOverlay.classList.add('open');
}

function cerrarAuthDrawer() {
  const authDrawer = document.getElementById('authDrawer');
  const globalOverlay = document.getElementById('globalOverlay');

  if (authDrawer) authDrawer.classList.remove('open');
  if (globalOverlay) globalOverlay.classList.remove('open');
}

function abrirCartDrawer() {
  const cartDrawer = document.getElementById('cartDrawer');
  const searchDrawer = document.getElementById('searchDrawer');
  const authDrawer = document.getElementById('authDrawer');
  const globalOverlay = document.getElementById('globalOverlay');

  if (cartDrawer) cartDrawer.classList.add('open');
  if (searchDrawer) searchDrawer.classList.remove('open');
  if (authDrawer) authDrawer.classList.remove('open');
  if (globalOverlay) globalOverlay.classList.add('open');

  renderizarContenidoCartDrawer();
}

function cerrarCartDrawer() {
  const cartDrawer = document.getElementById('cartDrawer');
  const globalOverlay = document.getElementById('globalOverlay');

  if (cartDrawer) cartDrawer.classList.remove('open');
  if (globalOverlay) globalOverlay.classList.remove('open');
}

function cerrarTodosLosDrawers() {
  cerrarSearchDrawer();
  cerrarAuthDrawer();
  cerrarCartDrawer();
}

// ==========================================
// RENDERIZAR CARRITO EN EL DRAWER LATERAL
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarritoHeader();
});

function actualizarContadorCarritoHeader() {
  const carrito = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = carrito.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    badge.textContent = totalItems;
  }
}

function renderizarContenidoCartDrawer() {
  const container = document.getElementById('cartDrawerItemsContainer');
  const totalContainer = document.getElementById('cartDrawerTotal');
  if (!container) return;

  const carrito = JSON.parse(localStorage.getItem('cart')) || [];
  container.innerHTML = '';

  if (carrito.length === 0) {
    container.innerHTML = '<p style="font-size:13px; color:#666; text-align:center; margin-top:30px;">Tu carrito está vacío.</p>';
    if (totalContainer) totalContainer.textContent = '$0';
    return;
  }

  let subtotalGeneral = 0;

  carrito.forEach(item => {
    const subtotalItem = (item.price || 0) * (item.quantity || 1);
    subtotalGeneral += subtotalItem;

    const itemRow = document.createElement('div');
    itemRow.className = 'cart-drawer-item';
    itemRow.innerHTML = `
      <img src="${item.image || ''}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/70x90?text=DIVINE'">
      <div class="cart-drawer-item-info">
        <div style="font-weight: 600; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">${item.name}</div>
        <div style="color: #666; margin-bottom: 3px;">Talle: ${item.size || 'Único'}</div>
        <div style="color: #666; margin-bottom: 5px;">Cant: ${item.quantity || 1}</div>
        <div style="font-weight: 600; color: #111; font-size: 14px;">$${subtotalItem.toLocaleString('es-AR')}</div>
      </div>
    `;
    container.appendChild(itemRow);
  });

  if (totalContainer) {
    totalContainer.textContent = `$${subtotalGeneral.toLocaleString('es-AR')}`;
  }
}

// ==========================================
// BÚSQUEDA DINÁMICA CONECTADA A LA BASE DE DATOS
// ==========================================

async function ejecutarBusquedaDinamica(query) {
  const q = query.trim();
  const container = document.getElementById('searchResultsContainer');
  const countContainer = document.getElementById('searchResultsCount');
  
  if (!container) return;
  container.innerHTML = '';

  if (q.length === 0) {
    if (countContainer) countContainer.textContent = '';
    return;
  }

  try {
    // Intentamos conectar con el servidor backend
    const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(q)}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const resultados = await response.json();

    if (countContainer) {
      countContainer.textContent = `${resultados.length} resultados encontrados`;
    }

    if (!Array.isArray(resultados) || resultados.length === 0) {
      container.innerHTML = '<p style="font-size:12px; color:#666; grid-column: span 2; padding: 10px;">No se encontraron productos.</p>';
      return;
    }

    resultados.forEach(prod => {
      const card = document.createElement('a');
      card.href = `producto.html?id=${prod.id}`;
      card.className = 'search-product-card';
      
      const imagenProd = prod.image || prod.image_first || 'https://via.placeholder.com/150x200?text=DIVINE';

      card.innerHTML = `
        <img src="${imagenProd}" alt="${prod.name}" onerror="this.src='https://via.placeholder.com/150x200?text=DIVINE'">
        <span class="search-product-title">${prod.name}</span>
        <span class="search-product-price">$${Number(prod.price).toLocaleString('es-AR')}</span>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error al buscar productos:", err);
    container.innerHTML = '<p style="font-size:12px; color:red; grid-column: span 2; padding: 10px;">Servidor apagado o inaccesible (Puerto 3000).</p>';
  }
}

// ==========================================
// LOGIN Y REGISTRO DESDE EL DRAWER (SIN ALERTS)
// ==========================================

function realizarLoginDrawer() {
  const emailInput = document.getElementById('drawerLoginEmail');
  const passInput = document.getElementById('drawerLoginPass');

  const email = emailInput ? emailInput.value.trim() : '';
  const pass = passInput ? passInput.value.trim() : '';

  if (!email || !email.includes('@') || !pass) {
    return;
  }
  
  cerrarAuthDrawer();
}

function realizarRegistroDrawer() {
  const nombreInput = document.getElementById('drawerRegNombre');
  const emailInput = document.getElementById('drawerRegEmail');
  const passInput = document.getElementById('drawerRegPass');

  const nombre = nombreInput ? nombreInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const pass = passInput ? passInput.value.trim() : '';

  if (!nombre || !email || !email.includes('@') || !pass) {
    return;
  }
  
  cerrarAuthDrawer();
}

// Validación estricta para cuentas de Gmail
function validarGmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email.trim());
}

// Notificación flotante elegante (reemplazo del alert)
function mostrarAvisoBonito(mensaje) {
  let toast = document.getElementById('divineToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'divineToastNotification';
    toast.className = 'divine-toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function realizarLoginDrawer() {
  const emailInput = document.getElementById('drawerLoginEmail');
  const passInput = document.getElementById('drawerLoginPass');

  const email = emailInput ? emailInput.value.trim() : '';
  const pass = passInput ? passInput.value.trim() : '';

  if (!validarGmail(email)) {
    mostrarAvisoBonito('Por favor, ingresá un correo de Gmail válido.');
    return;
  }
  if (!pass) {
    mostrarAvisoBonito('Por favor, ingresá tu contraseña.');
    return;
  }
  
  mostrarAvisoBonito('¡Sesión iniciada con éxito!');
  setTimeout(() => cerrarAuthDrawer(), 1200);
}

function realizarRegistroDrawer() {
  const nombreInput = document.getElementById('drawerRegNombre');
  const emailInput = document.getElementById('drawerRegEmail');
  const passInput = document.getElementById('drawerRegPass');

  const nombre = nombreInput ? nombreInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const pass = passInput ? passInput.value.trim() : '';

  if (!nombre) {
    mostrarAvisoBonito('Por favor, ingresá tu nombre y apellido.');
    return;
  }
  if (!validarGmail(email)) {
    mostrarAvisoBonito('Por favor, ingresá una cuenta de Gmail válida (ej: usuario@gmail.com).');
    return;
  }
  if (!pass || pass.length < 6) {
    mostrarAvisoBonito('La contraseña debe tener al menos 6 caracteres.');
    return;
  }
  
  mostrarAvisoBonito(`¡Bienvenida a DIVINE, ${nombre}! Cuenta creada con éxito.`);
  setTimeout(() => cerrarAuthDrawer(), 1500);
}

// ==========================================
// FILTRADO DE LOCALES POR PROVINCIA
// ==========================================

function filtrarLocalesPorProvincia(provinciaSeleccionada) {
  const tarjetasLocales = document.querySelectorAll('.store-card');

  tarjetasLocales.forEach(card => {
    const provinciaCard = card.getAttribute('data-province');

    if (provinciaSeleccionada === "" || provinciaCard === provinciaSeleccionada) {
      card.style.display = "block"; // Muestra la tarjeta si coincide o si no hay filtro
    } else {
      card.style.display = "none";  // Oculta la tarjeta si no coincide
    }
  });
}