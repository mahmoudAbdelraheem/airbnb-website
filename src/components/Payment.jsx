import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewReservation } from "../data/details/createNewReservation";
import toast from "react-hot-toast";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ToasterProvider from "../providers/ToasterProvider";
import SimpleNavbar from "./navbar/SimpleNavbar";
import Footer from "./Footer";
import getCurrentUser from "../data/auth/getCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import { useTranslation } from "react-i18next";

export default function Payment() {
  const [currentUser, setCurrentUser] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const initializeComponent = async () => {
      setIsLoading(true);
      await fetchCurrentUserData();

      if (location.state) {
        setPaymentDetails(location.state);
      } else {
        navigate("/");
      }
      setIsLoading(false);
    };

    initializeComponent();
  }, [navigate, location]);

  const fetchCurrentUserData = async () => {
    try {
      const data = await getCurrentUser();
      setCurrentUser(data);
    } catch (error) {
      loginModal.onOpen();
    }
  };

  const handlePaymentSuccess = async (details) => {
    const { totalPrice, dateRange, listingId, userId, authorId } =
      paymentDetails;

    if (totalPrice === null || totalPrice === undefined) {
      navigate("/");
      return;
    }

    try {
      const result = await createNewReservation({
        totalPrice,
        dateRange,
        listingId,
        userId,
        authorId,
      });

      if (result.success) {
        await toast.success(t("PaymentSuccessful"));
        navigate("/trips");
      } else {
        toast.error(t("ReservationFailed"));
      }
    } catch (error) {
      toast.error(t("PaymentFailed"), error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-5xl font-bold">
        {t("Loading...")}
      </div>
    );
  }

  // if (!paymentDetails || !paymentDetails.totalPrice) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="text-center">
  //         <p className="text-red-500 mb-4">
  //           Error: Payment details are missing.
  //         </p>
  //         <button
  //           onClick={() => navigate("/")}
  //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //         >
  //           Return to Home
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <SimpleNavbar user={currentUser} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ToasterProvider />
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            {t("ConfirmYourPayment")}
          </h1>
          <div className="mb-6">
            <p className="text-lg text-gray-600 font-bold">{t("totalPrice")}</p>
            <p className="text-2xl font-bold text-green-500">
              ${paymentDetails.totalPrice.toFixed(2)}
            </p>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="mt-6">
            <PayPalButtons
              className="w-full"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: paymentDetails.totalPrice.toString() },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                handlePaymentSuccess(details);
              }}
              onError={(err) => {
                toast.error(t("PaymentFailed"), err);
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
