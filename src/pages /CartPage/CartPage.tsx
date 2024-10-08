import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeCartItem, changeCartItems } from "../../redux/slices/cartSlice";
import { CartItem } from "./CartItem";
import { BackButton } from "../../components/BackButton";
import { useState } from "react";

import "./CartPage.scss";

export const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalAmount = !cartItems.length
    ? 0
    : cartItems
        .map((item) => {
          const price = item.price;
          const quantity = item.quantity || 1;
          return price * quantity;
        })
        .reduce((a, b) => a + b, 0);

  const totalAmountFixed = totalAmount.toFixed(2);

  let totalItems = 0;

  cartItems.forEach((item) => {
    const quantity = item.quantity || 1;
    totalItems += quantity;
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setErrorMessage("We are sorry, but this feature is not implemented yet.");
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeCartItem({ id }));
  };

  const handleChangeQuantity = (id: number, quantity: number) => {
    dispatch(changeCartItems({ id, quantity }));
  };

  return (
    <div className="CartPage">
      <div className="container container--with-min-height">
        <div className="CartPage__content">
          <div className="CartPage__breadcrumbs">
            <BackButton />
          </div>

          <h1 className="CartPage__title">Cart</h1>

          <div className="CartPage__products-container">
            {!cartItems.length ? (
              <h2 className="CartPage__title--error">Cart is empty</h2>
            ) : (
              <>
                <div className="CartPage__products">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      product={item}
                      onRemove={handleRemoveFromCart}
                      onChangeQuantity={handleChangeQuantity}
                    />
                  ))}
                </div>

                <div className="CartPage__checkout">
                  <h2 className="CartPage__amount">
                    {String.fromCodePoint(0x00024) + totalAmountFixed}{" "}
                  </h2>
                  <p className="CartPage__paragraph">
                    {`Total for ${totalItems} item${
                      totalItems !== 1 ? "s" : ""
                    }`}
                  </p>
                  <button
                    type="button"
                    className="CartPage__button"
                    onClick={handleClick}
                  >
                    Checkout
                  </button>

                  {errorMessage && (
                    <p className="CartPage__error-message">{errorMessage}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
