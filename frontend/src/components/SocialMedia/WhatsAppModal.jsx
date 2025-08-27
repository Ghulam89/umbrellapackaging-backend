// WhatsAppFloat.tsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";


const WhatsAppFloat = ({
  phone,
  message,
  tooltip,
  bottomClass,
  leftClass,
}) => {
  const encoded = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${encoded}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp chat"
      className={`fixed ${bottomClass} ${leftClass} z-50 group`}
    >
      <div className="relative">
        {/* ripple/ping effect */}
        <span className="absolute inset-0  rounded-full animate-ping opacity-30 bg-green-500"></span>

        {/* main button */}
        <div className="relative rounded-full p-3 shadow-lg bg-green-500 hover:bg-green-600 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
          <FaWhatsapp className="w-8 h-8 text-white" />
        </div>

        {/* tooltip (optional) */}
        {/* {tooltip && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs text-black opacity-0 group-hover:opacity-100 transition">
            {tooltip}
          </span>
        )} */}
      </div>
    </a>
  );
};

export default WhatsAppFloat;
