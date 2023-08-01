import React from "react";

const Spinners = () => {
  return (
    <div className="fixed inset-0 bg-transparent z-[9999] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-solid border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinners;
