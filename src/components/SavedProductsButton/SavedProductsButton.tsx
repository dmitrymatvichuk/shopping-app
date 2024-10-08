import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { RootState } from "../../redux/store";

import "./SavedProductsButton.scss";

type ButtonType = "cart";

type Props = {
  type: ButtonType;
};

const getPathname = (buttonType: ButtonType) => {
  switch (buttonType) {
    case "cart":
      return "/cart";
    default:
      return "/";
  }
};

export const SavedProductsButton: React.FC<Props> = ({ type }) => {
  const usePathname = getPathname(type);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const productsAmount = cartItems.length;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames("SavedProductsButton", `SavedProductsButton--${type}`, {
      "SavedProductsButton--selected": isActive,
    });

  return (
    <div className="SavedProductsButton__container">
      <NavLink to={usePathname} className={getLinkClass}>
        {productsAmount !== 0 && (
          <div key={productsAmount} className="SavedProductsButton__amount">
            {productsAmount}
          </div>
        )}
      </NavLink>
    </div>
  );
};
