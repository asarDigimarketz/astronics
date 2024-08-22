// components/Modal.jsx
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Customer Message</h2>
        <p>{message}</p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
