import React from "react";
import { CartItem } from "../types";

interface ShoppingCart {
  open: boolean;
  items: CartItem[];
  currency: string;

  // public fns
  updateCartItem(item: CartItem): void;
  removeItem(id: string): void;
  addToCart(item: CartItem): void;
  toggleCartState(open: boolean): void;
}

const STORAGE_KEY = "shopping-cart";

const defaultShoppingCartState: ShoppingCart = {
  open: false,
  items: [],
  currency: "€",
  updateCartItem: () => {},
  removeItem: () => {},
  addToCart: () => {},
  toggleCartState: () => {},
};

export const CartContext = React.createContext<ShoppingCart>(
  defaultShoppingCartState
);

type Props = { children: any };
type State = ShoppingCart;

export default class ShoppingCartProvider extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    const initialState = this._getInitialState();

    this.state = {
      ...initialState,
      currency: "€",
      open: false,
      updateCartItem: this.updateCartItem.bind(this),
      removeItem: this.removeItem.bind(this),
      addToCart: this.addToCart.bind(this),
      toggleCartState: this.toggleCartState.bind(this),
    };
  }

  _getInitialState() {
    try {
      return (
        JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
        defaultShoppingCartState
      );
    } catch {
      return defaultShoppingCartState;
    }
  }

  _updateState(
    newState?: Partial<State> | ((state: State) => Partial<State>),
    cb?: (state) => {}
  ) {
    try {
      this.setState(newState as State, () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        if (cb) cb(newState);
      });
    } catch {}
  }

  toggleCartState(open: boolean) {
    this.setState({
      open,
    });
  }

  removeItem(id: string) {
    this._updateState({
      items: this.state.items.filter((x) => x.id !== id),
    });
  }

  updateCartItem(item: CartItem) {
    const index = this.state.items.findIndex((x) => x.id === item.id);

    if (index < 0) return;

    const clonedItems = this.state.items;

    clonedItems.splice(index, 1, item);

    this._updateState({
      items: clonedItems,
    });
  }

  addToCart(item: CartItem) {
    console.log("addToCart", item);
    this.setState((state) => ({
      items: [...state.items, item],
    }));
  }

  render() {
    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
