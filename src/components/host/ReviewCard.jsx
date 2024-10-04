/* eslint-disable react/prop-types */
function ReviewCard({ review }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p className="text-gray-600 mb-2 truncate">{review.content}</p>
      <div className="flex items-center gap-2">
        <img
          src={review.userImage || "https://via.placeholder.com/50"}
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">{review.userName}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
