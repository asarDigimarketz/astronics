"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FaEnvelope, FaDumpster, FaUser } from "react-icons/fa";

const Admin = () => {
  const { data: session, status } = useSession();

  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/api/contact`);
      setCustomers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/api/register`);
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products`);
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchCustomers(), fetchUsers(), fetchProducts();
  }, []);

  return (
    <section className="h-screen overflow-y-auto bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <img
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={
                    session?.user?.image ||
                    "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                  }
                  alt="Admin"
                />
                {/* <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </div> */}
              </div>
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
            {[
              {
                title: "Customers",
                count: customers.length,
                icon: <FaEnvelope />,
              },
              { title: "Users", count: users.length, icon: <FaUser /> },
              {
                title: "Products",
                count: products.length,
                icon: <FaDumpster />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      {item.title}
                    </p>
                    <p className="text-2xl font-bold">{item.count}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Admin;
