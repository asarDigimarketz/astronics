"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import {
  FaHome,
  FaEnvelope,
  FaTable,
  FaSignOutAlt,
  FaBars,
  FaDumpster,
  FaUser,
} from "react-icons/fa";
import styles from "@/Components/sidebar/SideBar.module.css";

const Sidebar = () => {
  const { data: session, status } = useSession(); // Get session status

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };

  // Handle logout functionality
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await signOut({ redirect: false });
      window.location.href = "/"; // Redirect to home after logout
    }
  };

  const menuItems = [
    { name: "Astronix", icon: <FaBars />, path: null }, // No path for this item
    { name: "Home", icon: <FaHome />, path: "/admin" },
    {
      name: "Add Product",
      icon: <IoIosAddCircle />,
      path: "/admin/addproduct",
    },
    { name: "Add Banner", icon: <FaTable />, path: "/admin/addbanner" },
    { name: "Products", icon: <FaDumpster />, path: "/admin/allproducts" },
    { name: "Customers", icon: <FaEnvelope />, path: "/admin/customers" },
    { name: "Users", icon: <FaUser />, path: "/admin/users" },

    {
      name: "LogOut",
      icon: <FaSignOutAlt />,
      path: null, // No path, using onClick instead
      onClick: handleLogout, // Assigning the logout function
    },
  ];

  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const isSmall = useMediaQuery("(max-height: 550px)");

  return (
    <div className={`${styles.sidebar} ${expanded ? styles.expanded : ""}`}>
      {menuItems.map((item, index) => {
        const isMiddle = index !== 0 && index !== menuItems.length - 1;

        const content = (
          <div
            className={`${styles.boxiconContainer} ${
              expanded ? styles.expandedBoxiconContainer : ""
            }`}
            onMouseEnter={() => isMiddle && setHovered(index)}
            onMouseLeave={() => isMiddle && setHovered(null)}
            onClick={() => {
              if (isMiddle) setActive(index);
              if (item.path === null) {
                if (item.name === "LogOut") {
                  item.onClick(); // Trigger logout if the LogOut item is clicked
                } else {
                  setExpanded(!expanded); // Toggle sidebar when clicking on FaBars
                }
              }
            }}
            key={index}
          >
            <div
              className={`${styles.boxicon} ${
                active === index ? styles.active : ""
              }`}
              style={{ fontSize: isSmall ? "1.5rem" : "2rem" }}
            >
              {item.icon}
            </div>
            <p
              className={`${styles.description} ${
                expanded ? styles.showDescription : ""
              } ${active === index ? styles.activeDescription : ""}`}
            >
              {item.name}
            </p>
          </div>
        );

        return item.path ? (
          <Link href={item.path} key={index} className="no-underline a-style">
            {content}
          </Link>
        ) : (
          content
        );
      })}
    </div>
  );
};

export default Sidebar;
