
import React from 'react';

const Modal = ({ isOpen, onClose, children,className }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  bg-[rgba(0,0,0,0.8)]   z-50 inset-0   overflow-y-auto">
          <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className={`inline-block align-bottom bg-white  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  ${className} `}>
              {children}
            </div>
          </div>
             
            
        </div>
      )}
    </>
  );
};

export default Modal;