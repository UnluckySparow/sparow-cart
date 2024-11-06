import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import useCart from '../lib/table_cart'; // Import the hook
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Products() {
  const { AddToCart, cart } = useCart(); // Use the hook
  const [products, setProducts] = useState([]);
  const [visibleProd, setVisibleProd] = useState(13);
  const [counts, setCounts] = useState({});

  const get_products = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    get_products();
  }, []);

  const ShowMore = () => {
    setVisibleProd(prevCount => prevCount + 8);
  };

  const mois = (id) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 1) - 1, 1), // Ensures minimum count of 1
    }));
  };

  const plus = (id) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }));
  };

  const handleCart = (prod, quantity) => {
    AddToCart(prod, quantity); // Update cart using AddToCart from useCart hook
    console.log(cart);

  };

  return (
    <div className='products'>
      <div className='Header_products'>
        Our Products
        <Link className='btn_back' to={'/cart'}>
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>

      <div className='Grid_products'>
        {products.length > 0 ? (
          products.slice(1, visibleProd).map((product) => (
            <div className='inner_product' key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className='content_prod'>
                  <div className='product_img'>
                    <img src={product.image} alt={product.title} />
                  </div>
                  <h2>{product.title}</h2>
                  <span className='price'>${product.price}</span>
                </div>
              </Link>
              <div className='bottom_div'>
                <div className='count'>
                  <button className='mois' onClick={() => mois(product.id)}>-</button>
                  <span className='number'>{counts[product.id] || 1}</span>
                  <button className='plus' onClick={() => plus(product.id)}>+</button>
                </div>
                <button className='add_to_cart' onClick={() => handleCart(product, counts[product.id] || 1)}>Add to cart</button>
              </div>
            </div>
          ))
        ) : (
          <div>... Is Loading</div>
        )}
        {products.length > visibleProd && (
          <div className='Show_more_btn'>
            <button onClick={ShowMore}>Show More Product</button>
          </div>
        )}
      </div>
    </div>
  );
}
