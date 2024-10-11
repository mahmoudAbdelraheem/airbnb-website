import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewReservation } from "../data/details/createNewReservation";
import toast from "react-hot-toast";
import loadPayPalScript from "../hooks/loadPayPalScript";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ToasterProvider from "../providers/ToasterProvider";
import Container from "./Container";
import SimpleNavbar from "./navbar/SimpleNavbar";
import Footer from "./Footer";
import getCurrentUser from "../data/auth/getCurrentUser";
import useLoginModal from "../hooks/useLoginModal";

export default function Payment() {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const loginModel = useLoginModal();
  const nav = useNavigate();
  console.log("teeeest", location, location.state);
  useEffect(() => {
    if (location.state === null) {
      nav("/");
    }
    fetchCurrentUserData();
  }, [nav, location]);
  const { totalPrice, dateRange, listingId, userId, authorId } = location.state;

  const fetchCurrentUserData = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

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
  //   }, []);4

  const handlePaymentSuccess = async (details) => {
    const result = await createNewReservation({
      totalPrice,
      dateRange,
      listingId,
      userId,
      authorId,
    });

    if (result.success) {
      toast.success("Payment successful!");
      setTimeout(() => {
        nav("/trips");
      }, 3000);
    } else {
      toast.error("Failed");
    }
  };

  return (
    <div>
      <SimpleNavbar user={currentUser} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ToasterProvider />

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Confirm Your Payment
          </h1>

          <div className="mb-6">
            <p className="text-lg text-gray-600 font-bold">Total Price</p>
            <p className="text-2xl font-bold text-green-500">${totalPrice}</p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="mt-6">
            <PayPalButtons
              className="w-full"
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
