"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa";

import { toast } from "react-toastify";
import { format } from "date-fns";
import Modal from "./Model"; // Import the Modal component
import { useSession, signOut } from "next-auth/react";

const Customers = () => {
  const { data: session, status } = useSession();

  const [customers, setCustomers] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/api/contact`);
      setCustomers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/contact?id=${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
      toast.success(response.data.msg);
    } catch (err) {
      setError(err.message);
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <section className="h-screen overflow-y-auto bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow border-b py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <div className="flex items-center space-x-4">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  session?.user?.image ||
                  "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                }
                alt="Admin"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {session?.user?.name || "Admin Name"}
                </h2>
                <p className="text-sm text-gray-500">
                  {session?.user?.email || "admin@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    All Customers
                  </p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
                <div className="p-3 bg-indigo-500 text-white rounded-full">
                  <FaEnvelope />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 border-b">
              <h5 className="text-lg font-semibold">Customers</h5>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers
                    .map((customer) => (
                      <tr key={customer._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
                              alt=""
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {customer.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(new Date(customer.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {customer.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {customer.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {customer.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openModal(customer.message)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="ml-2 text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(customer._id)}
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
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={selectedMessage}
      />
    </section>
  );
};

export default Customers;
