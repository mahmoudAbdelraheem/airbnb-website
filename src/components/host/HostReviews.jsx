/* eslint-disable react/prop-types */
import ReviewCard from "./ReviewCard";

function HostReviews({ host }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Tanja’s reviews</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* {host.reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))} */}
      </div>
    </div>
  );
}

export default HostReviews;
