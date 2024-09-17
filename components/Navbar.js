import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({ email: decodedToken.email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" passHref>
                <div className="text-white font-bold text-xl cursor-pointer">Quiz App</div>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" passHref>
              <div className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Home</div>
            </Link>
            <Link href="/quizzes" passHref>
              <div className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Quizzes</div>
            </Link>
            {user ? (
            <div className="relative">
            <MdAccountCircle 
              className="text-2xl md:text-4xl text-gray-300 cursor-pointer"
              onMouseEnter={() => setDropdown(true)} 
              onMouseLeave={() => setDropdown(false)}
            />
            {dropdown && (
              <div 
                className="absolute right-0 mt-1 w-48 bg-indigo-700 rounded-md shadow-lg py-1 z-50"
                style={{ top: '80%' }} // Ensures dropdown starts right after the icon
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link href="/myaccount">
                  <div className="block px-4 py-2 text-sm text-gray-100 hover:bg-indigo-600">
                    My Account
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-indigo-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          
          ) : (
            <>
              <Link href="/login">
                <div className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </div>
              </Link>
              <Link href="/register">
                <div className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </div>
              </Link>
            </>
          )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" passHref>
            <div className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Home</div>
          </Link>
          <Link href="/quizzes" passHref>
            <div className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Quizzes</div>
          </Link>
          {user ? (
            <>
              <Link href="/myaccount">
                    <div className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My Account</div>
                  </Link>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <div className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Login</div>
              </Link>
              <Link href="/register" passHref>
                <div className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Register</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
