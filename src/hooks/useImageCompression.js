import { useState } from "react";
import { getImageSizeKB, validateFileType } from "../utils/imageHelpers";
import { compressImage } from "../utils/compressionLogic";

export default function useImageCompression() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [sizes, setSizes] = useState({ before: 0, after: 0 });

  const handleUpload = async (file) => {
    if (!validateFileType(file)) {
      alert("Please upload a valid image (JPG or PNG).");
      return;
    }
    setOriginal(URL.createObjectURL(file));
    const compressedFile = await compressImage(file);
    setCompressed(URL.createObjectURL(compressedFile));
    setSizes({
      before: getImageSizeKB(file),
      after: getImageSizeKB(compressedFile),
    });
  };

  return { original, compressed, sizes, handleUpload };
}
