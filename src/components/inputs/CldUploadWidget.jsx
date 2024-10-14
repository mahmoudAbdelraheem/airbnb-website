/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbPhotoPlus } from "react-icons/tb";

export default function CldUploadWidget({
  onUpload,
  images,
  setImages,
  disabled,
}) {
  const { t } = useTranslation();
  // To store both files and URLs
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      return images.length > 0 ? newIndex : 0;
    });
  };

  const handlePrevClick = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      return images.length > 0 ? newIndex : 0;
    });
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    setImages([]);
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      return {
        // Original file for upload
        file,
        // Object URL for preview
        url: URL.createObjectURL(file),
      };
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <input
          disabled={disabled}
          id="file-upload"
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className={`${
            disabled
              ? "cursor-not-allowed bg-gray-500"
              : "cursor-pointer bg-gray-700"
          }   text-white font-semibold py-2 px-4 rounded hover:bg-rose-500 transition duration-200 ease-in-out`}
        >
          <TbPhotoPlus size={40} />
        </label>
      </div>

      {images.length > 0 && images[currentIndex] && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-64">
          <img
            src={images[currentIndex].url}
            alt={`Image ${currentIndex}`}
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />

          <button
            onClick={handlePrevClick}
            className="h-8 w-8 absolute top-1/2 left-2 transform flex justify-center items-center -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-300"
          >
            {t("<")}
          </button>
          <button
            onClick={handleNextClick}
            className="h-8 w-8 absolute top-1/2 right-2 flex justify-center items-center transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-300"
          >
            {t(">")}
          </button>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onUpload}
        className={`${
          disabled ? "bg-gray-500" : "bg-blue-500"
        } mt-4 p-2  text-white rounded`}
      >
        {t("Upload to Firebase")}
      </button>
    </>
  );
}
