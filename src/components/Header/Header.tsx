import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "../Nav";
import { SavedProductsButton } from "../SavedProductsButton";

import "./Header.scss";

export const Header = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleMenuClick = () => {
    if (pathname === "/menu") {
      navigate(-1);
    }
  };

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__left-side">
          <NavLink
            to="/menu"
            className="Header__menu-button"
            onClick={handleMenuClick}
          >
            {" "}
          </NavLink>

          <div className="Header__nav-container">
            <Nav />
          </div>
        </div>

        <div className="Header__right-side">
          <SavedProductsButton type="cart" />
        </div>
      </div>
    </header>
  );
};
