import React, { useEffect, useRef, useState } from "react";
import Categories from "./Categories";
import Modal from "./Modal";
import { data } from "../data";
import ProductCard from "./ProductCard";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isFixed, setIsFixed] = useState(false);

  const categoryRefs = useRef({});
  const scrollRef = useRef(null);


  const handleButtonClick = (item) => {
    setSelectedProduct(item);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const listUniqueCategories = () => {
    const uniqueCategories = [...new Set(data.map((food) => food.category))];
    setCategories(uniqueCategories);
    if (uniqueCategories.length > 0) {
      setActiveCategory(uniqueCategories[0]);
    }
  };

  useEffect(() => {
    listUniqueCategories();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const category = entry.target.getAttribute("data-category");
          setActiveCategory(category);
        }
      });
    }, observerOptions);

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (categoryRefs.current) {
        Object.values(categoryRefs.current).forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, [categories]);

  const handleCategoryClick = (category) => {
    const element = categoryRefs.current[category];
    if (element) {
      const topOffset =
        element.getBoundingClientRect().top + window.pageYOffset - 50;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 30) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <Categories
        categories={categories}
        isFixed={isFixed}
        scrollRef={scrollRef}
        handleCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
      <div className="lg:container px-5 mx-auto">
        <div className="">
          {categories.map((category) => (
            <div
              key={category}
              ref={(el) => (categoryRefs.current[category] = el)}
              data-category={category}
              className="pb-10"
            >
              <h2 className="text-2xl font-bold mb-5">{category}</h2>
              <div className="grid grid-cols-1 justify-items-center  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
                {data
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <ProductCard
                      item={item}
                      key={item.id}
                      handleButtonClick={handleButtonClick}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <Modal product={selectedProduct} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Products;
