// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InfoModal from "./InfoModal";
import { AnimatePresence } from "framer-motion";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <nav className="bg-gray-800 text-white px-8 py-2 text-sm flex items-center justify-between">
      <ul className="flex gap-8">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Earth
          </Link>
        </li>
        <li>
          <Link to="/city/toronto" className="hover:text-gray-300">
            Toronto
          </Link>
        </li>
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-xl aspect-square h-8 p-2 flex items-center justify-center rounded-full hover:bg-blue-700"
      >
        ?
      </button>
      <AnimatePresence>
        {isModalOpen && <InfoModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
