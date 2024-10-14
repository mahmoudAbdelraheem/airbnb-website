import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../../data/firebaseConfig";
const uploadImagesToStorageAndGetUrls = async (images, uid) => {
  const uploadedImageUrls = []; // Array to store the URLs of uploaded images

  for (let image of images) {
    // Get the file
    const file = image.file;
    // Create a reference
    const storageRef = ref(firebaseStorage, `listings/${uid}/${file.name}`);

    try {
      // Upload the file
      await uploadBytes(storageRef, file);
      console.log("Uploaded:", file.name);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      // Store the URL in the array
      uploadedImageUrls.push(downloadURL);

      console.log("File available at:", downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  // Return the list of URLs
  return uploadedImageUrls;
};

export default uploadImagesToStorageAndGetUrls;
