/* eslint-disable react/prop-types */
import { useCallback } from "react";
import uploadImagesToStorageAndGetUrls from "../../data/listings/uploadImagesToStorageAndGetUrls";
import CldUploadWidget from "./CldUploadWidget";

export default function ImageUpload({
  images,
  setImages,
  disabled,
  uid,
  onChange,
}) {
  const handleUpload = useCallback(async () => {
    const imageFirebaseUrl = await uploadImagesToStorageAndGetUrls(images, uid);
    onChange(imageFirebaseUrl);
  }, [onChange]);

  return (
    <>
      <CldUploadWidget
        onUpload={handleUpload}
        images={images}
        setImages={setImages}
        disabled={disabled}
      />
    </>
  );
}
