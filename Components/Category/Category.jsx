"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Category.css";
import axios from "axios";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products`);
      const products = await response.data;
      setProducts(products);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to get the first occurrence of each unique category
  const getUniqueCategoryProducts = (products) => {
    const seenCategories = new Set();
    return products.filter((product) => {
      if (seenCategories.has(product.category)) {
        return false;
      } else {
        seenCategories.add(product.category);
        return true;
      }
    });
  };

  const uniqueCategoryProducts = getUniqueCategoryProducts(products);
  const newformatString = (str) =>
    str
      .replace(/-/g, " ") // Replace all hyphens with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {isLoading && <LoadingSkeleton />}
      {!isLoading && (
        <section id="collection" className="py-3 px-4">
          <div className="category-title text-center">
            <h2 className="text-4xl font-bold text-center text-white">
              Categories
            </h2>
          </div>
          <div className="relative container mx-auto">
            <Swiper
              spaceBetween={15}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Navigation]}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                  centeredSlides: false,
                },
                980: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  centeredSlides: false,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  centeredSlides: false,
                  loop: false,
                },
                1600: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  centeredSlides: false,
                  loop: false,
                },
              }}
            >
              {uniqueCategoryProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <Link href={`/products/${product.category}`}>
                    <div className="content">
                      <img src={product.image} alt={product.category} />
                      <div className="img-content">
                        <p className="text-lg font-bold">
                          {newformatString(product.category)}
                        </p>
                        <button className="mt-4 px-4 py-2 text-white rounded-lg hover:bg-white hover:text-primary transition-colors">
                          <span className="text-white">View More</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
              {/* Navigation buttons */}
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
};

export default Category;
