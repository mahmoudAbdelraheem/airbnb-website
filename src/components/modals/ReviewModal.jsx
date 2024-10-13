import Modal from "./Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useReviewModal from "../../hooks/useReviewModal";
import Button from "../Button";
import { addNewReview } from "../../data/reviews/addNewReview";
import { useNavigate } from "react-router-dom";
import ReviewRating from "../ReviewRating";
function ReviewModal() {
  const reviewModal = useReviewModal();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const [rating, setRating] = useState(0);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },

    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const reviewData = {
        rate: rating,
        ...data,
        ...reviewModal.reviewerData,
        createdAt: new Date().toISOString(),
      };
      console.log(reviewData);
      // close modal
      reviewModal.onClose();
      await addNewReview(reviewData);

      await toast.success("Review submitted successfully.");
      // go to host page to see review
      navigator(`/host/${reviewData.hostId}`);
    } catch (error) {
      console.log(error);
      toast.error("Review failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log(`New rating: ${newRating}`);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={t("ReviewTitle")} subtitle={t("ReviewSubtitle")} />
      <Input
        id={"content"}
        label={t("Content")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="w-full flex justify-center align-center">
        <ReviewRating
          ratingChanged={ratingChanged}
          iconSize={35}
          value={rating}
        />
        <span className="text-2xl mt-2 ml-5"> {rating}</span>
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex justify-end gap-4 mt-3">
      <Button
        outline
        label={t("Cancel")}
        onClick={reviewModal.onClose}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disable={isLoading}
      isOpen={reviewModal.isOpen}
      title={t("ReviewTitle")}
      actionLabel={t("Submit")}
      onClose={reviewModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default ReviewModal;
