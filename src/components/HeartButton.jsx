import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorites from "../hooks/useFavorites";

const HeartButton = ({ listingId, currentUser }) => {
  const { isFavorite, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });

  const [loading, setLoading] = useState(false); // Add loading state to prevent multiple clicks

  const handleClick = async (e) => {
    if (loading) return; // Prevent click if already loading
    setLoading(true); // Set loading to true while the API call is made

    try {
      await toggleFavorite(e); // Call the toggleFavorite function
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div
      onClick={handleClick} // Attach the local handleClick method
      className={`relative hover:opacity-80 transition cursor-pointer ${
        loading ? "opacity-50" : ""
      }`}
    >
      {/* Display the outline heart icon */}
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      {/* Display the filled heart based on the isFavorite state */}
      <AiFillHeart
        size={28}
        className={isFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
