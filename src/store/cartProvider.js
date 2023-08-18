import CartContex from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  amount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const itemToUpdate = state.items.find((item) => {
      return item.id === action.item.id;
    });
    if (typeof itemToUpdate === "undefined") {
      const updatedItems = state.items.concat(action.item);
      const updatedamount =
        state.amount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        amount: updatedamount,
      };
    } else {
      itemToUpdate.amount += 1;
      const updatedamount = state.amount + action.item.price;
      return {
        items: state.items,
        amount: updatedamount,
      };
    }
  } else if (action.type === "REMOVE") {
    const itemToUpdate = state.items.find((item) => {
      return item.id === action.id;
    });
    itemToUpdate.amount -= 1;
    const updatedamount = state.amount - itemToUpdate.price;
    return {
      items: state.items,
      amount: updatedamount,
    };
  } else if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    amount: cartState.amount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCartHandler,
  };

  return (
    <CartContex.Provider value={cartContext}>
      {props.children}
    </CartContex.Provider>
  );
};

export default CartProvider;
