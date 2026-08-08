import React from "react";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../Store/cart-context";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

function HeaderCartButton(props) {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);

  const cartCTX = useContext(CartContext);

  const { items } = cartCTX;

  const numberOfCartItems = cartCTX.items.reduce((curNumbers, item) => {
    return curNumbers + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.lenght === 0) {
      return;
    }

    setBtnIsHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
}

export default HeaderCartButton;
