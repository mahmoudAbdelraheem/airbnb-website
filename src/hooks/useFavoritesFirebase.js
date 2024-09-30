import { useCallback, useEffect, useMemo, useState } from "react";
import useLoginModel from "./useLoginModal";
import { Delete, Post } from "../data/favorites/addFavoriteToFirebase";
import toast from "react-hot-toast";
import { firebaseFirestore } from "../data/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function useFavoritesFirebase({ listingId, currentUser }) {
  const loginModel = useLoginModel();
  const [current, setCurrent] = useState();

  // Fetch the current user data from Firestore
  const fetchUser = async () => {
    try {
      const userRef = doc(firebaseFirestore, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setCurrent(userDoc.data());
      } else {
        console.error("User not found.");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Fetch user data when component mounts or when listingId or currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchUser();
    }
  }, [listingId, currentUser]);

  // Check if the listing is a favorite
  const isFavorite = useMemo(() => {
    const list = current?.favoritesIds || [];
    return list.includes(listingId);
  }, [current, listingId]);

  // Toggle favorite status
  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen(); // Open login modal if user is not logged in
      }

      try {
        if (isFavorite) {
          // If it's already a favorite, remove it
          await Delete(listingId, currentUser);
        } else {
          // Otherwise, add it as a favorite
          await Post(listingId, currentUser);
        }

        // Show success message and refetch updated user data
        toast.success("Success");
        await fetchUser(); // Ensure that fetchUser is called after the toggle is done
      } catch (err) {
        console.error("Error toggling favorite:", err);
        toast.error("Failed to update favorites.");
      }
    },
    [currentUser, isFavorite, listingId, loginModel] // Include necessary dependencies
  );

  return {
    isFavorite,
    toggleFavorite,
  };
}
