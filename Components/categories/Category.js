"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./category.css";

const Category = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products`);
      setProducts(response.data);
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
      <section className="allbanners mb-5 mt-0">
        <div className="banner-overlay">
          <div className="container">
            <div className="allbannercontent text-center">
              <h2 className="text-white">Category</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="productcategory my-5">
        <div className="container">
          <div className="row">
            {uniqueCategoryProducts.map((product) => (
              <div
                className="col-6 col-lg-4 col-md-6 col-sm-6 mb-4"
                key={product._id}
              >
                <Link
                  href={`/products/${product.category}`}
                  className="no-underline"
                >
                  <div className="card">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.category}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {newformatString(product.category)}
                      </h5>
                      <button className="contactbtn mt-3">View More</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative w-full aspect-video overflow-hidden bg-gray-900 text-white h-[50vh] sm:h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="assets/img/video/VU_MasterPiece_lo_QLED_TV_Long_Final_with_watermark.mp4"
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
