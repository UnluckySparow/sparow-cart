import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []; 
  });

  useEffect(() => {
   
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const AddToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart); 
    } else {
      setCart([...cart, { product, quantity }]); 
    }
    toast.success('Added to cart !')
  };

  const DeleteFromCart = (product) => {
    const updatedCart = cart.filter(item => item.product.id !== product.id);
    setCart(updatedCart);
    toast.success('Has been deleted')
  };

  return {
    cart,
    AddToCart,
    DeleteFromCart
  };
};

export default useCart;
