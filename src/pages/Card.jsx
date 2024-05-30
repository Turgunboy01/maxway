import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { removeItem, updateQuantity } from "../redux/CartSlice";
import { CartItem } from "../components/CartItem";
const Cart = () => {
  const { data } = useSelector((state) => state.cart);
  //   console.log(data);
  //   const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  useEffect(() => {
    const total = data.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
    setTotal(total);
  });

  return (
    <div className="lg:container px-5 mx-auto w-full ">
      <h1 className="text-[32px] font-bold my-4">Savatcha</h1>
      <div className=" flex :justify-between flex-wrap  gap-20">
        <div className="bg-white shadow-md rounded-lg flex-1 h-[100%] scrollbar-hide  h-[465px] overflow-y-scroll ">
          {data.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="bg-white shadow-md rounded-lg w-full lg:w-[400px] h-[100%] p-4 mt-4">
          <h1 className="text-[20px] text-black font-semibold">Umumiy</h1>
          <div className="flex justify-between">
            <span className="text-[18px]">Mahsulotlar</span>
            <span className="text-[18px] font-semibold">{total} so'm</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Yetkazib berish</span>
            <span className="text-[18px] font-semibold">0 so'm</span>
          </div>
          <hr />
          <div className="flex justify-between mt-2 ">
            <span>To'lash uchun</span>
            <span className="text-[18px] font-semibold">{total} so'm</span>
          </div>
          <button
            className={`w-full mt-4 py-2 rounded-full ${
              total < 40000
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 text-white"
            }`}
            disabled={total < 40000}
          >
            To'lov sahifasiga o'tish
          </button>
          {total < 40000 && (
            <p className="text-red-500 text-center mt-2">
              Eng kam buyurtma narxi 40 000 so'm bo'lishi kerak
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
