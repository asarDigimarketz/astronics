// components/AdminLayout.jsx
import React from "react";
import dynamic from "next/dynamic"; // Dynamic import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import Sidebar to improve HMR support
const Sidebar = dynamic(() => import("@/Components/sidebar/SideBar"), {
  ssr: false,
});

// Import CSS directly if not using a CSS module
import "./style.css";

const AdminLayout = ({ children }) => {
  return (
    <section className="adminLayout">
      <Sidebar />
      <main className="mainContent">
        <ToastContainer theme="dark" />
        {children}
      </main>
    </section>
  );
};

export default AdminLayout;
