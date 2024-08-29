"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import astronixlogo from "../../public/assets/logo/auxlogo.png";
import "./NavBar.css";

const adminEmails = [
  "print5onlinestore@gmail.com",
  "manoj@gmail.com",
  "azar@magizhdigitalmarketing.com",
];

const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`/api/products`);
    return data.reduce((acc, product) => {
      if (!acc.some((p) => p.category === product.category)) {
        acc.push(product);
      }
      return acc;
    }, []);
  } catch (err) {
    console.error("Failed to fetch products:", err.message);
    return [];
  }
};

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [dropOpenMenu, setDropOpenMenu] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdmin =
    session?.user?.email && adminEmails.includes(session.user.email);

  const fetchProductsCallback = useCallback(async () => {
    const uniqueProducts = await fetchProducts();
    setProducts(uniqueProducts);
  }, []);

  useEffect(() => {
    fetchProductsCallback();
  }, [fetchProductsCallback]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown") &&
        !event.target.closest(".user-dropdown")
      ) {
        setDropOpenMenu(false);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await signOut({ redirect: false });
      window.location.href = "/"; // Redirect to home after logout
    }
  };

  const formatString = (str) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const productLinks = products.map((product) => ({
    href: `/products/${product.category}`,
    label: formatString(product.category),
  }));

  return (
    <header className="antialiased bg-gray-800 text-white">
      <nav>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={astronixlogo}
                width={130}
                height={100}
                alt="Astronix Logo"
              />
            </Link>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <NavLink href="/" label="Home" pathname={pathname} />
              <NavLink href="/about" label="About" pathname={pathname} />
              <NavLink href="/services" label="Services" pathname={pathname} />

              <NavLink
                href="/hometheatre"
                label="Home Theatre"
                pathname={pathname}
              />
              <Link href="/products" passHref>
                <Dropdown
                  label="Products"
                  links={productLinks}
                  pathname={pathname}
                  setDropOpenMenu={setDropOpenMenu}
                />
              </Link>

              <NavLink href="/brand" label="Brand" pathname={pathname} />
              <NavLink
                href="/contactus"
                label="Contact Us"
                pathname={pathname}
              />
              {isAdmin && (
                <NavLink href="/admin" label="Admin" pathname={pathname} />
              )}
              {session?.user ? (
                <UserDropdown
                  session={session}
                  handleLogout={handleLogout}
                  dropOpenMenu={userDropdownOpen}
                  setDropOpenMenu={setUserDropdownOpen}
                />
              ) : (
                <NavLink href="/login" label="Login" pathname={pathname} />
              )}
            </div>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex lg:hidden p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="Toggle Menu"
            >
              {openMenu ? (
                <FaTimes className="w-6 h-6" aria-hidden="true" />
              ) : (
                <FaBars className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {openMenu && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink href="/" label="Home" pathname={pathname} />
              <NavLink href="/about" label="About" pathname={pathname} />
              <NavLink href="/services" label="Services" pathname={pathname} />
              <Dropdown
                label="Products"
                link="/products"
                links={productLinks}
                pathname={pathname}
                setDropOpenMenu={setDropOpenMenu}
                mobile
              />
              <NavLink
                href="/contactus"
                label="Contact Us"
                pathname={pathname}
              />
              {isAdmin && (
                <NavLink href="/admin" label="Admin" pathname={pathname} />
              )}
              {session?.user ? (
                <UserDropdown
                  session={session}
                  handleLogout={handleLogout}
                  dropOpenMenu={userDropdownOpen}
                  setDropOpenMenu={setUserDropdownOpen}
                  mobile
                />
              ) : (
                <NavLink href="/login" label="Login" pathname={pathname} />
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLink = memo(({ href, label, pathname, className = "" }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      } ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
});

const Dropdown = memo(
  ({ label, links, pathname, setDropOpenMenu, mobile = false }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const isActive = pathname.startsWith("/products");

    const toggleDropdown = () => {
      setDropdownOpen((prev) => !prev);
      setDropOpenMenu && setDropOpenMenu((prev) => !prev);
    };

    return (
      <div
        className={`relative ${mobile ? "block" : ""} dropdown`}
        onMouseEnter={() => !mobile && setDropdownOpen(true)}
        onMouseLeave={() => !mobile && setDropdownOpen(false)}
      >
        <button
          onClick={toggleDropdown}
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          {label}
          <FaCaretDown className="inline ml-2" aria-hidden="true" />
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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
        )}
      </div>
    );
  }
);

const UserDropdown = memo(
  ({
    session,
    handleLogout,
    dropOpenMenu,
    setDropOpenMenu,
    mobile = false,
  }) => (
    <div
      className={`relative ${
        mobile ? "block mt-3 user-dropdown" : "ml-4"
      } flex-shrink-0 z-50`}
    >
      <img
        src={session.user.image || "/user/user.jpg"}
        width={25}
        height={25}
        alt="user image"
        className="cursor-pointer rounded-full border border-gray-300"
        onClick={() => setDropOpenMenu(!dropOpenMenu)}
        aria-haspopup="true"
        aria-expanded={dropOpenMenu}
      />
      {dropOpenMenu && (
        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-opacity duration-300 ${
            dropOpenMenu ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="p-2 text-gray-700">
            <div className="font-bold">{session.user.name}</div>
            <div className="text-sm">{session.user.email}</div>
          </div>
          <button
            className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
);

export default NavBar;
