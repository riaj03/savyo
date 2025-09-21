import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaPlus } from "react-icons/fa";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Deals", href: "/deals" },
  { name: "Stores", href: "/stores" },
  { name: "Categories", href: "/categories" },
];

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-2xl font-bold text-primary-600">
                    Savyo
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-primary-500 hover:text-gray-700"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/create-deal"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FaPlus className="mr-2" />
                      Create Deal
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn btn-secondary"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-primary">
                      Sign In
                    </Link>
                    <Link to="/register" className="btn btn-primary">
                      Register
                    </Link>
                  </>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-primary-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex flex-col space-y-4 px-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/create-deal"
                      className="btn btn-primary w-full justify-center"
                    >
                      <FaPlus className="mr-2" />
                      Create Deal
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn btn-secondary w-full justify-center"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-primary w-full justify-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary w-full justify-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
