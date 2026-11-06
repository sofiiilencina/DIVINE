import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  // useEffect se conecta a tu servidor Node.js apenas se abre la página
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div className="sku-carousel__container">
      <h4 className="sku-carousel__title">Productos destacados</h4>
      <div className="swiper-wrapper" style={{ display: 'flex', gap: '20px' }}>
        {products.map(product => (
          <div className="swiper-slide" key={product.id} style={{ width: '300px' }}>
            <div className="position-relative hover-img-animation">
              <img className="img-responsive hover-img-first" src={product.image_first} alt={product.name} style={{ width: '100%' }} />
            </div>
            <figcaption className="item-description_container" style={{ textAlign: 'center', marginTop: '10px' }}>
              <h3 className="item__name">{product.name}</h3>
              <div className="item__price">$ {product.price}</div>
            </figcaption>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;