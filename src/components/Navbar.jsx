import React from 'react';
import { IoLogoFirebase } from "react-icons/io5";
import { FaReact } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logos */}
        <div className="flex items-center">
          <div className="text-white text-lg font-semibold mr-4">
            <IoLogoFirebase />
          </div>
          <div className="text-white text-lg font-semibold">
            <FaReact/>
          </div>
        </div>

        {/* Heading */}
        


        {/* Navigation Links */}
        <div className="space-x-5">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
