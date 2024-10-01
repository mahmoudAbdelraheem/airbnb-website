import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeartButton from "../HeartButton";
import getCurrentUser from "../../data/auth/getCurrentUser";

export default function ImageListing({ id, imageSrc }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const fetchUser = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleShowImages = () => {
    setShowAllImages((prev) => !prev);
  };

  const openFullscreenImage = (src) => {
    setFullscreenImage(src);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl relative">
      <div className="flex flex-wrap md:flex-nowrap space-x-2">
        {imageSrc
          .slice(0, showAllImages ? imageSrc.length : 3)
          .map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-1/3 mb-2"
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-[60vh] rounded-lg cursor-pointer"
                onClick={() => openFullscreenImage(src)}
              />
            </motion.div>
          ))}
      </div>

      <div className="mt-2">
        {!showAllImages && imageSrc.length > 3 && (
          <button
            onClick={toggleShowImages}
            className="text-blue-500 hover:underline"
          >
            Show more images
          </button>
        )}
        {showAllImages && (
          <button
            onClick={toggleShowImages}
            className="text-blue-500 hover:underline ml-2"
          >
            Show less images
          </button>
        )}
      </div>

      {fullscreenImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full cursor-pointer"
            onClick={closeFullscreen}
          />
        </motion.div>
      )}

      <div className="absolute top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
    </div>
  );
}
