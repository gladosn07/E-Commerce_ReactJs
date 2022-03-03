import React, { useState, useEffect } from "react";
import { commerce } from '../lib/commerce'
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProduct(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const res = await commerce.cart.add(productId, quantity);

    setCart(res.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const res = await commerce.cart.update(productId, { quantity });
    setCart(res.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const res = await commerce.cart.remove(productId);
    setCart(res.cart);
  };

  const handleEmptyCart = async () => {
    const res = await commerce.cart.empty();
    setCart(res.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCapureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingorder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingorder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        product,
        cart,
        order,
        errorMessage,
        handleAddToCart,
        handleUpdateCartQty,
        handleRemoveFromCart,
        handleEmptyCart,
        handleCapureCheckout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
