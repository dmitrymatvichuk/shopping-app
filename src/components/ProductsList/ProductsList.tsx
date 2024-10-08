import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import "./ProductsList.scss";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface CartProduct extends Product {
  name: string;
  discount: number;
  imageUrl: string;
  type: string;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
}

export const ProductsList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    const cartProduct: CartProduct = {
      ...product,
      name: product.title,
      discount: 0,
      imageUrl: product.image,
      type: product.category,
      quantity: 1,
    };
    dispatch(addToCart(cartProduct));
  };

  return (
    <div className="ProductsList__products">
      {products.map((product) => (
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
              className="ProductCard__button"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
