import React from "react";
import { CartContext } from "../context/ShoppingCart";

import { CartDrawer, Overlay } from "../styles";
import ShoppingCart from "./ShoppingCart";

export default function Cart() {
  const { open, toggleCartState } = React.useContext(CartContext);

  return (
    <React.Fragment>
      <CartDrawer open={open}>
        <ShoppingCart />
      </CartDrawer>

      {open && <Overlay onClick={() => toggleCartState(false)} />}
    </React.Fragment>
  );
}
