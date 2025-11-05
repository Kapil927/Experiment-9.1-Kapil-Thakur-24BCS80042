export const getImageSizeKB = (file) => (file.size / 1024).toFixed(2);

export const validateFileType = (file) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  return validTypes.includes(file.type);
};
