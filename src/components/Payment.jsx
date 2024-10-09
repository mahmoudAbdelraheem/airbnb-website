import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewReservation } from "../data/details/createNewReservation";
import toast from "react-hot-toast";
import loadPayPalScript from "../hooks/loadPayPalScript";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Payment() {
  const location = useLocation();
  const nav = useNavigate();
  const {
    totalPrice = 0,
    dateRange,
    listingId,
    userId,
    authorId,
  } = location.state;

  // The below to load PayPal script first
  //   useEffect(() => {
  //     const loadScript = async () => {
  //       try {
  //         await loadPayPalScript(
  //           "AasK2GKojq52lJAafMj9rWD31tv__ahYAhLtiGLmvdKMVjlzYwHyrHVwPphoXBs0d-mJB6KPW5LZ-QV8"
  //         );
  //       } catch (error) {
  //         toast.error("PayPal Error");
  //       }
  //     };

  //     loadScript();
  //   }, []);

  const handlePaymentSuccess = async (details) => {
    const result = await createNewReservation({
      totalPrice,
      dateRange,
      listingId,
      userId,
      authorId,
    });

    if (result.success) {
      toast.success("Payment successful");
      nav("/trips");
    } else {
      toast.error("Failed");
    }
  };

  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: totalPrice.toString() },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          handlePaymentSuccess(details);
        }}
        onError={(err) => {
          toast.error("Failed", err);
        }}
      />
    </div>
  );
}
