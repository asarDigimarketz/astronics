"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import uploadImage from "../../public/download-icon-cloud+upload+file+storage+upload+icon-1320190558968694328_256.png";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTable } from "react-icons/fa";
import { format } from "date-fns";
import { FiTrash } from "react-icons/fi";

const AddBanner = () => {
  const inputRef = useRef();
  const [bannerData, setBannerData] = useState({
    bannerTitle: "",
    bannerDescription: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerData((data) => ({ ...data, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      ...bannerData,
    };

    const formData = new FormData();
    Object.keys(formattedData).forEach((key) => {
      formData.append(key, formattedData[key]);
    });
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`/api/carouselbanner`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message || "All fields are required");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBannerData({
      bannerTitle: "",
      bannerDescription: "",
    });
    setImage(null);
    inputRef.current.focus();
  };
  const [bannerCarousel, setBannerCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`/api/carouselbanner`);
      const banner = await response.data;
      setBannerCarousel(banner);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/carouselbanner?id=${id}`);
      setBannerCarousel(bannerCarousel.filter((banner) => banner._id !== id));
      toast.success(response.data.msg);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <section className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Add New Banner
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input
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
            name="bannerTitle"
            value={bannerData.bannerTitle}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
            ref={inputRef}
            placeholder="Enter Banner Title"
          />
        </div>
       
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="bannerDescription"
            value={bannerData.bannerDescription}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
            ref={inputRef}
            placeholder="Enter Banner Description"
          />
        </div> */}

          {/* Image Upload */}
          <div className="flex items-center justify-center space-x-4">
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
                required
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
              {loading ? "Adding Banner..." : "Add Banner"}
            </button>
          </div>
        </form>
      </section>
      <section className="py-10 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">All Banners</p>
                  <p className="text-3xl font-bold">{bannerCarousel.length}</p>
                </div>
                <div className="p-3 bg-white text-indigo-500 rounded-full">
                  <FaTable />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-4 py-4 border-b">
              <h5 className="text-lg font-semibold">Banners</h5>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bannerCarousel
                    .map((banner) => (
                      <tr
                        key={banner._id}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={banner.image}
                              alt="Banner Image"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(new Date(banner.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="ml-2 text-red-600 hover:text-red-900 transition-colors"
                            onClick={() => handleDelete(banner._id)}
                          >
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                    .reverse()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBanner;
