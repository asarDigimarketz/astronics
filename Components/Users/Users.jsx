"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { format } from "date-fns";
import astronixlogo from "../../public/assets/logo/auxlogo.png";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/api/register`);
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/register?id=${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success(response.data.msg);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 shadow border-b py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="">
              <Image
                src={astronixlogo}
                width={130}
                height={100}
                alt={"astronixlogo"}
              />
            </Link>
            {/* <div className="flex items-center space-x-4">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                alt="Admin"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Admin Name
                </h2>
                <p className="text-sm text-gray-500">admin@example.com</p>
              </div>
            </div> */}
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
                    All Users
                  </p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <div className="p-3 bg-indigo-500 text-white rounded-full">
                  <FaUser />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 border-b">
              <h5 className="text-lg font-semibold">Users</h5>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>

                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th> */}
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users
                    .map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                              }
                              alt=""
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(new Date(user.createdAt), "MMM d, yyyy")}
                        </td>

                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openModal(product.image)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="ml-2 text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(user._id)}
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
    </div>
  );
};

export default Users;
