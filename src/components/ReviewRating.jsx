import Rating from "react-rating-stars-component";

function ReviewRating({ value, ratingChanged, iconSize }) {
  return (
    <div>
      <Rating
        count={5}
        value={value} // Display the rating value
        onChange={ratingChanged} // If ratingChanged is provided, allow changes
        size={iconSize}
        activeColor="#ffd700"
        isHalf={true}
        edit={!!ratingChanged} // If ratingChanged exists, allow editing
      />
    </div>
  );
}

export default ReviewRating;
