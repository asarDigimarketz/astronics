"use client";

import "./Products.css";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  FaSearchMinus,
  FaSearchPlus,
  FaSyncAlt,
  FaDownload,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
// Set the workerSrc to the path in the public folder
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

const usePdfOptions = () => {
  return useMemo(
    () => ({
      cMapUrl: "/cmaps/",
      standardFontDataUrl: "/standard_fonts/",
    }),
    []
  );
};

const Spinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

const Products = ({ params }) => {
  const { category } = params;
  const [products, setProducts] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(false);

  const options = usePdfOptions();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/${category}`);
        setProducts(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProducts();
  }, [category]);

  const handleViewMore = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setPageNumber(1);
    setLoading(true);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
    setPageNumber(1);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    setError(error.message);
    setLoading(false);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5));
  };

  const resetZoom = () => setScale(1.0);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedPdf;
    link.download = selectedPdf.split("/").pop(); // Set the download name to the PDF filename
    link.click();
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };
  const newformatString = (str) =>
    str
      .replace(/-/g, " ") // Replace all hyphens with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <div className="py-8 mt-5">
      <div className="container mx-auto grid grid-custom gap-4">
        {products
          .map((product) => {
            const { originalPrice } = product;
            const discountPercentage = (
              ((originalPrice - product.price) / originalPrice) *
              100
            ).toFixed(0);

            return (
              <div
                key={product._id}
                className="bg-gray-100 rounded-xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="flex-grow flex justify-center bg-gray-300">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-64 w-64 object-contain"
                  />
                </div>
                <div className="px-4 py-2 flex flex-col flex-grow">
                  <h5 className="font-bold text-lg mt-2">
                    {newformatString(product.title)}
                  </h5>
                  <div className="flex justify-start items-center">
                    <h5 className="text-black font-bold text-lg px-1 mt-1">
                      <FaIndianRupeeSign className="inline-flex" />
                      {product.price.toLocaleString("en-IN")}
                    </h5>
                    <h5 className="text-red-500 text-sm line-through px-2">
                      <FaIndianRupeeSign className="inline-flex" />
                      {originalPrice.toLocaleString("en-IN")}
                    </h5>
                    <h5 className="text-green-500 text-sm">
                      {discountPercentage}% OFF
                    </h5>
                  </div>
                  <div
                    className="text-gray-600 text-sm mt-2 list-disc pl-4 product-description"
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  ></div>
                  <div className="flex-grow flex items-end">
                    <button
                      className="contactbtn text-white rounded-full px-4 py-2 mt-2"
                      onClick={() => handleViewMore(product.pdf)}
                    >
                      View more
                    </button>
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>

      {selectedPdf && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 my-5">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl h-full max-h-screen p-4 relative">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h2 className="text-lg font-bold">Product PDF</h2>
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={handleClosePdf}
              >
                Close
              </button>
            </div>
            <div className="relative h-full flex flex-col">
              {loading && <Spinner />}
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <div className="relative flex-grow overflow-auto">
                    <Document
                      file={selectedPdf}
                      onLoadError={onDocumentLoadError}
                      onLoadSuccess={onDocumentLoadSuccess}
                      options={options}
                      className="relative"
                      style={{ zIndex: 2 }}
                    >
                      <Page pageNumber={pageNumber} scale={scale} />
                    </Document>
                  </div>
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center p-4 bg-white z-10">
                    <div className="flex space-x-2">
                      <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={goToPreviousPage}
                        disabled={pageNumber <= 1}
                      >
                        <FaArrowLeft />
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                      >
                        <FaSearchMinus />
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={handleZoomIn}
                        disabled={scale >= 3.0}
                      >
                        <FaSearchPlus />
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={resetZoom}
                      >
                        <FaSyncAlt />
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                    <div className="ml-4">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={handleDownload}
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
