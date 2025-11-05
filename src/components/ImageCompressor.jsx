import React from "react";

const ImageCompressor = ({ original, compressed }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div>
        <h2 className="text-sm font-semibold text-slate-600 mb-2">Original Image</h2>
        <img src={original} alt="Original" className="rounded-lg shadow-md w-full" />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-slate-600 mb-2">Compressed Image</h2>
        <img src={compressed} alt="Compressed" className="rounded-lg shadow-md w-full" />
      </div>
    </div>
  );
};

export default ImageCompressor;
