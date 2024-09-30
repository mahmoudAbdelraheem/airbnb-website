import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavoritesFirebase from "../hooks/useFavoritesFirebase";
import toast from "react-hot-toast"; // Import toast for error handling

const HeartButton = ({ listingId, currentUser }) => {
  const { isFavorite, toggleFavorite } = useFavoritesFirebase({
    listingId,
    currentUser,
  });

  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    if (loading) return;
    setLoading(true);

    try {
      await toggleFavorite(e);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      toast.error("Failed to update favorite."); // Notify user of the error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative hover:opacity-80 transition cursor-pointer ${
        loading ? "opacity-50" : ""
      }`}
      role="button" // Added role for accessibility
      tabIndex={0} // Allow keyboard navigation
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={isFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
      {loading && <span className="loader" />} {/* Optional loading spinner */}
    </div>
  );
};

export default HeartButton;
