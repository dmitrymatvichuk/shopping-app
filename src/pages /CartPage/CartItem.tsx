import React, { useCallback } from "react";
import { Product } from "../../types/Product";

type CartItemProps = {
  product: Product & { quantity: number };
  onRemove: (id: number) => void;
  onChangeQuantity: (id: number, quantity: number) => void;
};

export const CartItem: React.FC<CartItemProps> = ({
  product,
  onRemove,
  onChangeQuantity,
}) => {
  const { price, image, quantity, title, id } = product;

  const validQuantity = Math.max(quantity, 1);

  const handleDeleteItem = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  const handleQuantityChange = useCallback(
    (action: "remove" | "add") => {
      const newQuantity =
        action === "remove" ? validQuantity - 1 : validQuantity + 1;
      if (newQuantity >= 1) {
        onChangeQuantity(id, newQuantity);
      }
    },
    [id, validQuantity, onChangeQuantity]
  );

  const totalPrice = (price * validQuantity).toFixed(2);

  return (
    <div className="CartItem">
      <div className="CartItem__section">
        <button
          type="button"
          data-cy="cartDeleteButton"
          className="CartItem__remove-button"
          onClick={handleDeleteItem}
        ></button>

        <div
          className="CartItem__product-img"
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className="CartItem__product-name">{title}</div>
      </div>

      <div className="CartItem__section">
        <div className="CartItem__quantity-section">
          <button
            type="button"
            className="CartItem__quantity-button CartItem__quantity-button--remove"
            onClick={() => handleQuantityChange("remove")}
            disabled={validQuantity <= 1}
          ></button>

          <div className="CartItem__quantity" data-cy="productQauntity">
            {validQuantity}
          </div>

          <button
            type="button"
            className="CartItem__quantity-button CartItem__quantity-button--add"
            onClick={() => handleQuantityChange("add")}
          ></button>
        </div>
        
        <span className="CartItem__price">{`$${totalPrice}`}</span>
      </div>
    </div>
  );
};
