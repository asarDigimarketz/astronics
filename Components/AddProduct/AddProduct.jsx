"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css"; // Import Quill styles
import uploadImage from "../../public/download-icon-cloud+upload+file+storage+upload+icon-1320190558968694328_256.png";
import pdfUploadImage from "../../public/pdf-upload-image.jpg";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const inputRef = useRef();
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    newCategory: "",
    originalPrice: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products`);
        setProducts(response.data);
      } catch (err) {
        toast.error("Failed to fetch products");
        console.error(err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((data) => ({ ...data, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setProductData((data) => ({ ...data, description: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      ...productData,
      title: formatString(productData.title),
      category: formatString(
        productData.newCategory ? productData.newCategory : productData.category
      ),
      originalPrice: Number(productData.originalPrice),
      price: Number(productData.price),
    };

    const formData = new FormData();
    Object.keys(formattedData).forEach((key) => {
      formData.append(key, formattedData[key]);
    });
    if (image) formData.append("image", image);
    if (pdf) formData.append("pdf", pdf);

    try {
      const response = await axios.post(`/api/products`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message || "All fields are required");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductData({
      title: "",
      description: "",
      category: "",
      newCategory: "",
      originalPrice: "",
      price: "",
    });
    setImage(null);
    setPdf(null);
    inputRef.current.focus();
  };

  const formatString = (str) => str.toLowerCase().replace(/\s+/g, "-");

  const newformatString = (str) =>
    str
      .replace(/-/g, " ") // Replace all hyphens with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize the first letter of each word

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
            ref={inputRef}
            placeholder="Enter product title"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <ReactQuill
            value={productData.description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            theme="snow"
            placeholder="Write a detailed description"
          />
        </div>

        {/* Image Upload */}
        <div className="flex items-center space-x-4">
          <div className="form-group">
            <p className="text-sm font-medium text-gray-700">Upload Image</p>
            <label htmlFor="image" className="cursor-pointer">
              <Image
                height={70}
                width={140}
                src={image ? URL.createObjectURL(image) : uploadImage}
                alt="Upload Product Image"
                className="rounded-md"
              />
            </label>
            <input
              type="file"
              id="image"
              name="image"
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
          >
            <option value="" disabled>
              Select a category
            </option>
            {[...new Set(products.map((product) => product.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {newformatString(category)}
                </option>
              )
            )}
          </select>
        </div>

        {/* New Category Input */}
        <div>
          <label
            htmlFor="newCategory"
            className="block text-sm font-medium text-gray-700"
          >
            New Category (optional)
          </label>
          <input
            type="text"
            id="newCategory"
            name="newCategory"
            value={productData.newCategory}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
            placeholder="Enter a new category"
          />
        </div>

        {/* Original Price Input */}
        <div>
          <label
            htmlFor="originalPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Original Price
          </label>
          <input
            type="number"
            id="originalPrice"
            name="originalPrice"
            value={productData.originalPrice}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
            placeholder="Enter original price"
          />
        </div>

        {/* Price Input */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
            placeholder="Enter product price"
          />
        </div>

        {/* PDF Upload */}
        <div className="flex items-center space-x-4">
          <div className="form-group">
            <p className="text-sm font-medium text-gray-700">Upload PDF</p>
            <label htmlFor="pdf" className="cursor-pointer">
              {pdf ? (
                <p className="text-gray-900 font-semibold">{pdf.name}</p>
              ) : (
                <Image
                  height={70}
                  width={140}
                  src={pdfUploadImage}
                  alt="Upload Product PDF"
                  className="rounded-md"
                />
              )}
            </label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              hidden
              accept="application/pdf"
              onChange={handlePdfChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
