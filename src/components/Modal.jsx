import React, { useState } from "react";
import { addToCart, removeItem, updateQuantity } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Modal = ({ product, closeModal }) => {
  // const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const handleAddToCart = (product) => {
    let totalPrice = qty * +product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };
    // console.log(totalPrice);
    dispatch(addToCart(tempProduct));
    navigate("/cart");
  };
  const plusQty = (qty) => {
    setQty(qty + 1);
  };
  const minusQty = (qty) => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  const { data } = useSelector((state) => state.cart);
  console.log(data, product, "card");
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        className="bg-white p-6 rounded-lg w-[711px] grid grid-cols-1 justify-items-center relative sm:grid-cols-2 gap-7"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="w-[300px]  object-cover rounded"
          src={product.img}
          alt={product.name}
        />
        <div className="ml-6 flex flex-col justify-between w-full relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.desc}</p>
            </div>
            <button className="text-xl font-bold " onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="flex justify-between items-center mt-[50px]">
            <div className="flex items-center border border-[#51267d] px-3 py-1  rounded-full">
              <button
                className="px-2 py-1  rounded-l-lg "
                // onClick={decreaseQuantity}
                onClick={() => minusQty(qty)}

                // onClick={() => decreaseQty(product.id, product.quantity)}
              >
                -
              </button>
              <span className="px-4">
                {/* {!product?.quantity ? 0 : product.quantity} */}
                {qty}
              </span>
              <button
                className="px-2 py-1  rounded-r-lg"
                // onClick={increaseQuantity}
                onClick={() => plusQty(qty)}
              >
                +
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-[#51267d] text-white rounded-full"
                onClick={() => handleAddToCart(product)}
              >
                {product.price * qty} so'm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
