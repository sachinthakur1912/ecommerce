import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

export default function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserApi.cart;
  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "4rem", marginTop: "2rem" }}>
        Cart empty
      </h2>
    );
  console.log(cart);
  return (
    <div>
      {cart.map((p) => (
        <div className="cart-detail">
          <img src={p.images.link} alt="" />
          <div className="cart-box-detail">
            <div className="row">
              <h2>{p.title}</h2>
              <h6>{p.product_id}</h6>
            </div>
            <span>${p.price}</span>
            <p>{p.description}</p>
            <p>{p.content}</p>
            <p>{p.sold}</p>
            <Link to="/cart" className="cart">
              Buy Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
