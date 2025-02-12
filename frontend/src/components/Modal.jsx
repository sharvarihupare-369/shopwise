import React, { useEffect } from "react";

const Modal = ({ children, onClose,duration=1000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          onClose();
        }, duration);
    
        return () => clearTimeout(timer);
      }, [onClose, duration]);
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black-700"
        >
          ✖
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
