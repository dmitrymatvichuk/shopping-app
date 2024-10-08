import { Product } from "../../types/Product";

type CartItemProps = {
  product: Product;
  onRemove: (id: number) => void;
  onChangeQuantity: (id: number, quantity: number) => void;
};

export const CartItem: React.FC<CartItemProps> = ({
  product,
  onRemove,
  onChangeQuantity,
}) => {
  const { price, imageUrl, quantity, name, id } = product;

  const validQuantity = quantity ?? 1;

  const handleDeleteItem = () => {
    onRemove(id);
  };

  const handleQuantityChange = (action: string) => () => {
    const newQuantity =
      action === "remove" ? validQuantity - 1 : validQuantity + 1;

    if (newQuantity >= 1) {
      onChangeQuantity(id, newQuantity);
    }
  };

  const totalPrice = (price * validQuantity).toFixed(2);

  return (
    <div className="CartItem">
      <div className="CartItem__section">
        <button
          type="button"
          data-cy="cartDeleteButton"
          className="CartItem__remove-button"
          onClick={handleDeleteItem}
        >
          {" "}
        </button>
        <div
          className="CartItem__product-img"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="CartItem__product-name">{name}</div>
      </div>
      <div className="CartItem__section">
        <div className="CartItem__quantity-section">
          <button
            type="button"
            className="CartItem__quantity-button CartItem__quantity-button--remove"
            onClick={handleQuantityChange("remove")}
            disabled={validQuantity <= 1}
          >
            {" "}
          </button>
          <div className="CartItem__quantity" data-cy="productQauntity">
            {validQuantity}
          </div>
          <button
            type="button"
            className="CartItem__quantity-button CartItem__quantity-button--add"
            onClick={handleQuantityChange("add")}
          >
            {" "}
          </button>
        </div>
        <span className="CartItem__price">
          {String.fromCodePoint(0x00024)}
          {totalPrice}
        </span>
      </div>
    </div>
  );
};
