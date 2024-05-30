import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ id: itemId }));
  };
  const increaseQty = (cartProductId, currentQty) => {
    const newQty = currentQty + 1;
    dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
  };

  const decreaseQty = (cartProductId, currentQty) => {
    const newQty = Math.max(currentQty - 1, 0);
    dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
  };

  return (
    <div className="flex items-center  justify-between  px-[30px] py-[40px] border-b">
      <div className="flex items-center gap-3">
        <img
          src={item.img}
          alt={item.name}
          className="w-10 sm:w-16 h-10 sm:h-16 object-cover rounded-lg"
        />
        <p>{item.name}</p>
      </div>
      <div className=" ml-4">
        <div className="flex items-center gap-5">
          <div className="flex items-center border">
            <button
              className="p-2"
              onClick={() => decreaseQty(item.id, item.quantity)}
            >
              -
            </button>
            <span className="px-2 sm:px-4">{item.quantity}</span>
            <button
              className="p-2"
              onClick={() => increaseQty(item.id, item.quantity)}
            >
              +
            </button>
          </div>
          <p>{item.price} so'm</p>
        </div>
      </div>
    </div>
  );
};
