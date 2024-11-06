import React, { useEffect, useState } from 'react';
import './Single.css';
import { Link, useParams } from 'react-router-dom';
import useCart from '../lib/table_cart';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Single() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false); // To track if the item is added
  const { AddToCart, cart } = useCart(); // Use the cart hook

  useEffect(() => {
    const get_prod = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProd(data);
      } catch (err) {
        console.log(err.message);
        setProd(null);
      } finally {
        setLoading(false);
      }
    };
    get_prod();
  }, [id]);

  const mois = () => {
    if (number > 1) setNumber(prev => prev - 1); // Ensure quantity doesn't go below 1
  };

  const plus = () => {
    setNumber(prev => prev + 1);
  };

  const handleCart = (prod, quantity) => {
    AddToCart(prod, quantity); // Update cart using AddToCart from useCart hook
    console.log(cart);

  };

  if (loading) {
    return <div>... loading</div>;
  }

  return (
    <div className="Single_products">
      {prod ? (
        <div>
          <Link to="/">
            <div className="Header_products">
              Show all products
              <Link className='btn_back' to={'/cart'}>
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
            </div>
          </Link>
          <div className="product">
            <div className="col-img">
              <img src={prod.image} alt={prod.title} className="img_prod" />
            </div>
            <div className="col-prod-content">
              <span className="category">{prod.category}</span>
              <h1>{prod.title}</h1>
              <span className="price">${prod.price}</span>
              <p className="desc">{prod.description}</p>
              <div className="count">
                <button className="mois" onClick={mois}>
                  -
                </button>
                <span className="number">{number}</span>
                <button className="plus" onClick={plus}>
                  +
                </button>
              </div>
              <div className="btn_add_to_cart">
                <button
                  className="add_to_cart"
                  onClick={() => handleCart(prod, number)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {addedToCart && (
            <div className="added-to-cart-feedback">Item added to cart!</div>
          )}
        </div>
      ) : (
        <div>Product Not Found</div>
      )}
    </div>
  );
}
