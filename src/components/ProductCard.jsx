import React, { useState } from "react";
import { addToCart } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ item, handleButtonClick }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
  };

  return (
    <>
      <div
        className="w-[300px] cursor-pointer bg-white rounded-lg shadow  overflow-hidden"
        key={item.id}
        onClick={() => handleButtonClick(item)}
      >
        <img
          className="w-full h-[200px] object-cover rounded-t-lg hover:scale-105 transition-all duration-300"
          src={item.img}
          alt={item.name}
        />
        <div className="p-4">
          <p className="text-gray-800 text-lg font-semibold">{item.name}</p>
          {/* <p className="text-gray-600">{item.description}</p> */}
          {item.desc && item.desc.length > 0 && (
            <p className="text-gray-600">{item.desc.slice(0, 50)}...</p>
          )}
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-800 font-bold">
              {item.price.toLocaleString()} so'm
            </p>
            <button
              className="p-2 bg-[#51267d] text-white rounded-full px-4"
              onClick={(e) => {
                handleAddToCart(item);
                (e) => e.stopPropagation();
              }}
            >
              Qo'shish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
