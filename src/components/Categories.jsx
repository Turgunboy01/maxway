import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const Categories = ({
  isFixed,
  categories,
  scrollRef,
  handleCategoryClick,
  activeCategory,
}) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
    <>
      <div className={`bg-[#fff] z-10 w-[100%] lg:container px-5 mx-auto`}>
        <div
          ref={scrollRef}
          className={`flex space-x-4  py-2 ${
            categories.length > 3 ? "overflow-x-auto" : ""
          } scrollbar-hide`}
        >
          <Slider {...settings} className="w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-[10px] whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#f1eff4] text-[#51267d]"
                    : "bg-[#fff] text-[#51267d]"
                }`}
              >
                {category}
              </button>
            ))}
          </Slider>
        </div>
      </div>
      {isFixed && (
        <div
          className={`bg-[#fff] w-full z-30 ${
            isFixed ? "fixed top-0  translate-y-0" : "-translate-y-[100px]"
          }`}
        >
          <div
            className={` lg:container px-4 mx-auto z-10 w-[100%] transition-[.5s] delay-150 ease-in-out flex items-center justify-between gap-[30px] `}
          >
            <div
              ref={scrollRef}
              className={`flex space-x-4 py-2 w-[100%]  ${
                categories.length > 3 ? "overflow-x-auto" : ""
              } scrollbar-hide`}
            >
              {/* <Slider {...settings} className="w-full"> */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-[10px] whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-[#f1eff4] text-[#51267d]"
                      : "bg-[#fff] text-[#51267d]"
                  }`}
                >
                  {category}
                </button>
              ))}
              {/* </Slider> */}
            </div>
            <div className="flex items-center gap-[40px]">
              <Link to={"/cart"} className="flex items-center gap-2">
                <PiShoppingCartSimpleFill className="bg-[#f1eff4] w-[30px] h-[30px] p-2" />
                <p className="flex flex-col">
                  {total}
                  <span className="-mt-2"> so'm</span>
                </p>
              </Link>

              <FaUser className="bg-[#f1eff4] w-[30px] h-[30px] p-2" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
