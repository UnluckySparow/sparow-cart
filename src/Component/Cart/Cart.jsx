import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import useCart from '../lib/table_cart';
import { toast } from 'react-toastify';
export default function Cart() {
  const { cart, DeleteFromCart } = useCart();
  const [table, setTable] = useState([]);

  useEffect(() => {
    setTable(cart);
  }, [cart]);

  const handleDelete = (product) => {
    DeleteFromCart(product); 
    toast.success(`${product.title} has been removed from the cart!`); 
  };

  return (
    <div className='Cart'>
      <div className='Header_products'>
        My Cart
        <Link className='btn_back' to={'/'}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>

      <div>
        {!table? (
          <div> <h2> Cart Empty ! </h2></div>
        ) : (
        <table className='table_cart'>
          <thead>
            <tr>
              <td>Image</td>
              <td>Product</td>
              <td>Quantity</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {table.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.product.image} alt={item.product.title} />
                </td>
                <td>{item.product.title}</td>
                <td>{item.quantity}</td>
                <td>
                  <button className='fa_trash' onClick={() => handleDelete(item.product)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) 
      }
      </div>
    </div>
  );
}
