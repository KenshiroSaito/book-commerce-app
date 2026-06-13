"use client";

import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader size={50} color="#123abc" />
    </div>
  );
};

export default LoadingSpinner;
