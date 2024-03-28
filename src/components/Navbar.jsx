// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InfoModal from "./InfoModal";
import { AnimatePresence } from "framer-motion";
import { cities } from "../helpers";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <nav
      className="bg-gray-800/70 text-white px-8 py-2 text-sm 
      flex items-center justify-between absolute w-full z-50 h-15"
    >
      <ul className="flex gap-8">
        <li className="flex gap-8">
          <Link to="/" className="hover:text-gray-300">
            Earth
          </Link>
          <Link to="/forest" className="hover:text-gray-300">
            Forest
          </Link>
        </li>
        <li>|</li>
        {Object.values(cities).map((city) => (
          <li key={city.name}>
            {city.disabled ? (
              <span className="text-gray-500">{city.name}</span>
            ) : (
              <Link to={`/city/${city.id}`} className="hover:text-gray-300">
                {city.name}
              </Link>
            )}
          </li>
        ))}
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
