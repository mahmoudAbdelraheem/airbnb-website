import React, { useEffect, useRef } from "react";

export default function CldUploadWidget({ onUpload }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "your-cloud-name", // Replace with your Cloudinary cloud name
        uploadPreset: "your-upload-preset", // Replace with your upload preset
        multiple: false, // Allow only one file per upload
        cropping: true, // Optional: Enable cropping
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("Uploaded file info:", result.info);
          onUpload(result.info); // Pass uploaded file info to parent component
        }
      }
    );
  }, [onUpload]);

  const openWidget = () => {
    widgetRef.current.open(); // Open the widget when button is clicked
  };

  return (
    <button
      onClick={openWidget}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Upload Image
    </button>
  );
}
