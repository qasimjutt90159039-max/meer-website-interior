import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="pt-28 pb-20 min-h-[75vh] flex items-center justify-center bg-[#F4F7F7]">
      <div className="max-w-md w-full bg-white border border-[#E5EBEC] p-10 text-center rounded-sm shadow-sm space-y-5">
        <div className="w-14 h-14 rounded-full bg-[#95B2B8]/20 border border-[#95B2B8] text-[#172326] flex items-center justify-center mx-auto">
          <Compass className="w-7 h-7 text-[#95B2B8]" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-[#95B2B8] block font-bold">
          ERROR 404 // ROUTE NOT FOUND
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-[#172326]">
          Spatial Coordinate Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#596568] leading-relaxed font-light">
          The page or route you attempted to access does not exist in the Meer’s Interior catalog registry.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs uppercase font-bold">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] px-5 py-3 rounded-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/furniture"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-[#E5EBEC] hover:border-[#95B2B8] text-[#172326] px-5 py-3 rounded-sm transition-all bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
