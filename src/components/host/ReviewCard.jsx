import ReviewRating from "../ReviewRating";

/* eslint-disable react/prop-types */
function ReviewCard({ review }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p className="text-gray-600 mb-2 ">{review.content}</p>
      <div className="flex items-center gap-2">
        <img
          src={review.reviwerImage || "https://via.placeholder.com/50"}
          alt="User"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div>
            <p className="text-sm font-medium">{review.reviwerName}</p>
            <p className="text-xs text-gray-500">{review.createdAt}</p>
          </div>
          <div className="flex justify-end">
            <ReviewRating value={review.rate} iconSize={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
