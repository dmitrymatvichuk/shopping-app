import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { Product } from "../../types/Product";

import "./ProductsList.scss";

interface ProductListProps {
  products: Product[];
}

export const ProductsList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const isProductInCart = (productId: number) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div className="ProductsList__products">
      {products.map((product) => {
        const inCart = isProductInCart(product.id);

        return (
          <div className="ProductCard" key={product.id}>
            <div className="ProductCard__content">
              <div className="ProductCard__img-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="ProductCard__img"
                />
              </div>
              <h3 className="ProductCard__name">{product.title}</h3>
            </div>

            <div className="ProductCard__footer">
              <div className="ProductCard__price">{product.price} $</div>
              <button
                className={`ProductCard__button ${
                  inCart ? "ProductCard__button--added" : ""
                }`}
                onClick={() => {
                  if (inCart) {
                    handleRemoveFromCart(product.id);
                  } else {
                    handleAddToCart(product);
                  }
                }}
              >
                {inCart ? "Delete card" : "Add to Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
