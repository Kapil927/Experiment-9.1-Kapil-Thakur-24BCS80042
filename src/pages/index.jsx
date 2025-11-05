import React from "react";
import Header from "../components/Header";
import ImageUploader from "../components/ImageUploader";
import ImageCompressor from "../components/ImageCompressor";
import ResultPreview from "../components/ResultPreview";
import useImageCompression from "../hooks/useImageCompression";

export default function HomePage() {
  const { original, compressed, sizes, handleUpload } = useImageCompression();

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-2xl">
      <Header />
      <ImageUploader onUpload={handleUpload} />
      {compressed && (
        <>
          <ImageCompressor original={original} compressed={compressed} />
          <ResultPreview beforeSize={sizes.before} afterSize={sizes.after} />
        </>
      )}
    </div>
  );
}
