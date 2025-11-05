import React from "react";

const ImageUploader = ({ onUpload }) => {
  return (
    <div className="border-2 border-dashed rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100 transition">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onUpload(e.target.files[0])}
        className="hidden"
        id="imageInput"
      />
      <label htmlFor="imageInput" className="cursor-pointer text-blue-600 font-medium">
        Click to upload an image
      </label>
      <p className="text-xs text-slate-500 mt-2">Supported formats: JPG, PNG, JPEG</p>
    </div>
  );
};

export default ImageUploader;
