import React, { useCallback } from "react";
import CldUploadWidget from "./CldUploadWidget";

export default function ImageUpload({ onChange, value }) {
  const handleUpload = useCallback(
    (result) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <>
      <CldUploadWidget onUpload={handleUpload}></CldUploadWidget>
    </>
  );
}
