import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewProducts from "../ReviewProducts/ReviewProducts";

const Orders = () => {
  const { orderCart } = useLoaderData();
  const [cart, setCart] = useState(orderCart);

  const deleteHandler = (id) => {
    const remainig = cart.filter((product) => product.id !== id);
    setCart(remainig);
    removeFromDb(id);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.clear();
  };
  return (
    <div className="shopContainer">
      <div className="ordersContainer">
        {cart.map((product) => (
          <ReviewProducts
            key={product.id}
            product={product}
            deleteHandler={deleteHandler}
          ></ReviewProducts>
        ))}
        {cart.length === 0 && (
          <h1 style={{ textAlign: "center" }}>
            No products in your shopping cart, <Link to="/shop">Shop Now</Link>
          </h1>
        )}
      </div>
      <div className="orderSummary">
        <Cart cart={cart} clearCart={clearCart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
