"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import "./NavBar.css";
import { useSession, signOut } from "next-auth/react";
import astronixlogo from "../../public/assets/logo/auxlogo.png";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const pathname = usePathname(); // Get the current path
  // authentication start
  const { data: session, status } = useSession();
  const [dropopenMenu, setdropOpenMenu] = useState(false);

  // List of admin email addresses
  const adminEmails = [
    "print5onlinestore@gmail.com",
    "manoj@gmail.com",
    "azar@magizhdigitalmarketing.com",
  ];
  // Check if the user is an admin
  const isAdmin =
    session?.user?.email && adminEmails.includes(session.user.email);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await signOut({ redirect: false });
      window.location.href = "/"; // Redirect to home after logout
    }
  };

  useEffect(() => {
    // Handle menu closing on click outside or other actions
    const handleClickOutside = (event) => {
      if (event.target.closest(".relative") === null) {
        setdropOpenMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // authentication end

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products`);
        const products = response.data;

        // Filter unique categories
        const uniqueProducts = products.reduce((acc, product) => {
          if (!acc.some((p) => p.category === product.category)) {
            acc.push(product);
          }
          return acc;
        }, []);

        setProducts(uniqueProducts);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProducts();
  }, []);

  // const formatUrl = (str) => str.replace(/\s+/g, "-").toLowerCase();
  const newformatString = (str) =>
    str
      .replace(/-/g, " ") // Replace all hyphens with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase());
  const productLinks = products.map((product) => ({
    href: `/products/${product.category}`,
    label: newformatString(product.category),
  }));

  return (
    <header className="antialiased">
      <nav>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between flex-grow">
              <div className="flex-shrink-0">
                <h1 className="text-lg font-semibold tracking-widest text-white uppercase">
                  <Link href="/" className="">
                    <Image
                      src={astronixlogo}
                      width={130}
                      height={100}
                      alt={"astronixlogo"}
                    />
                  </Link>
                </h1>
              </div>
              <div className="hidden lg:flex lg:items-center">
                <NavLink href="/" label="Home" pathname={pathname} />
                <NavLink href="/about" label="About" pathname={pathname} />
                <NavLink
                  href="/services"
                  label="Services"
                  pathname={pathname}
                />
                <Dropdown
                  label="Products"
                  link="/products"
                  links={productLinks}
                  pathname={pathname}
                />
                <NavLink
                  href="/contactus"
                  label="Contact Us"
                  pathname={pathname}
                />
                {isAdmin && (
                  <NavLink
                    href="/admin"
                    label="Admin"
                    pathname={pathname}
                    className="register-btn" // Unique class for Register button
                  />
                )}
                {session?.user ? (
                  <div className="relative ml-4 z-50">
                    <img
                      src={session.user.image || "/user/user.jpg"} // Fallback image if user.image is not available
                      width={25}
                      height={25}
                      alt="userimage"
                      className="cursor-pointer rounded-full border border-gray-300"
                      onClick={() => setdropOpenMenu(!dropopenMenu)}
                    />
                    {dropopenMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                        <div className="p-2 text-gray-700">
                          <div className="flex items-center mb-2">
                            <img
                              src={session.user.image || "/user/user.jpg"} // Fallback image if user.image is not available
                              width={25}
                              height={25}
                              alt="userimage"
                              className="mr-2 rounded-full border border-gray-300"
                            />
                            <span>{session.user.name}</span>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="w-full text-white bg-gray-700 hover:text-white hover:bg-gray-500 p-2 rounded-md"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink href="/login" label="Login" pathname={pathname} />
                )}
              </div>
              <div className="flex lg:hidden">
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white hover:text-white hover:bg-gray-700"
                >
                  <span className="sr-only">Open main menu</span>
                  {openMenu ? (
                    <FaTimes className="w-6 h-6" />
                  ) : (
                    <FaBars className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {openMenu && (
          <div className="block lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink href="/" label="Home" pathname={pathname} />
              <NavLink href="/about" label="About" pathname={pathname} />
              <NavLink href="/services" label="Services" pathname={pathname} />
              <Dropdown
                label="Products"
                link="/products"
                links={productLinks}
                pathname={pathname}
              />
              <NavLink
                href="/contactus"
                label="Contact Us"
                pathname={pathname}
              />{" "}
              {isAdmin && (
                <NavLink
                  href="/admin"
                  label="Admin"
                  pathname={pathname}
                  className="register-btn" // Unique class for Register button
                />
              )}
              {session?.user ? (
                <div className="relative ml-4 z-50">
                  <img
                    src={session.user.image || "/user/user.jpg"} // Fallback image if user.image is not available
                    width={25}
                    height={25}
                    alt="userimage"
                    className="cursor-pointer rounded-full border border-gray-300"
                    onClick={() => setdropOpenMenu(!dropopenMenu)}
                  />
                  {dropopenMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <div className="p-2 text-gray-700">
                        <div className="flex items-center mb-2">
                          <img
                            src={session.user.image || "/user/user.jpg"} // Fallback image if user.image is not available
                            width={25}
                            height={25}
                            alt="userimage"
                            className="mr-2 rounded-full border border-gray-300"
                          />
                          <span>{session.user.name}</span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-white bg-gray-700 hover:text-white hover:bg-gray-500 p-2 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink href="/login" label="Login" pathname={pathname} />
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

const NavLink = ({ href, icon, label, pathname, className = "" }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md focus:outline-none ${
        isActive
          ? "text-white bg-gray-900"
          : "text-gray-300 hover:text-white hover:bg-gray-700"
      } ${className}`} // Added className prop here
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
};

const Dropdown = ({ label, icon, link, links, pathname }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isActive = pathname.startsWith(link);

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <Link
        href={link}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md focus:outline-none ${
          isActive
            ? "text-white bg-gray-900"
            : "text-gray-300 hover:text-white hover:bg-gray-700"
        }`}
      >
        {icon}
        <span className="mx-2">{label}</span>
        <FaCaretDown className="w-4 h-4 ml-1 transition-transform duration-200" />
      </Link>
      <div
        className={`absolute left-0 w-48 mt-2 origin-top-left bg-white rounded-md shadow-lg cat-dropdown transition-opacity duration-300 ${
          dropdownOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
