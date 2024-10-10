import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { RootState } from "../../redux/store";
import { useMemo } from "react";

import "./SavedProductsButton.scss";

type ButtonType = "cart";

type Props = {
  type: ButtonType;
};

export const SavedProductsButton: React.FC<Props> = ({ type }) => {
  const location = useLocation();
  const pathName = type === "cart" ? "/cart" : location.pathname;

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const linkClass = useMemo(
    () =>
      classNames("SavedProductsButton", `SavedProductsButton--${type}`, {
        "SavedProductsButton--selected": false,
      }),
    [type]
  );

  return (
    <div className="SavedProductsButton__container">
      <NavLink to={pathName} className={linkClass}>
        {cartItems.length !== 0 && (
          <div className="SavedProductsButton__amount">{cartItems.length}</div>
        )}
      </NavLink>
    </div>
  );
};
