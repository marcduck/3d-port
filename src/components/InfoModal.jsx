import { motion } from "framer-motion";

const InfoModal = ({ onClose }) => {
  // Animation variants for the modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      onClick={onClose}
      className="z-50 fixed inset-0 bg-gray-600 flex items-center bg-opacity-50 overflow-y-auto h-full w-full"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative h-min mx-auto p-5 border w-3/4 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="mt-3">
          <h3 className="text-2xl text-center font-medium text-gray-900">
            Explore the Globe
          </h3>
          <div className="mt-2 px-7 py-3">
            <div className="text-sm text-gray-500 leading-6">
              Use left mouse to rotate and right mouse to pan. Scroll in and out
              to zoom.
              <br />
              Mobile: Drag to rotate, use two fingers to pan & pinch to zoom.
              <br />
              Click on map markers to visit different locations.
              <h4 className="text-lg text-gray-900 pt-2 pb-3">Coming soon:</h4>
              <ul className="list-disc list-inside">
                <li>More locations</li>
                <li>Weather</li>
                <li>First-person mode</li>
                <li>NPCs</li>
              </ul>
            </div>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoModal;
