import Container from "../Container";
import { LiaAddressCardSolid } from "react-icons/lia";
import { MdOutlineSecurity, MdPayments } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { AiOutlineNotification } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import AccountBox from "./AccountBox";
const AccountCards = () => {
  const cards = [
    {
      title: "Personal info",
      description: "Provide personal details and how we can reach you",
      icon: LiaAddressCardSolid,
    },
    {
      title: "Login & security",
      description: "Update your password and secure your account",
      icon: MdOutlineSecurity,
    },
    {
      title: "Payments & payouts",
      description: "Review payments, payouts, coupons and gift cards",
      icon: MdPayments,
    },
    {
      title: "Taxes",
      description: "Manage taxpayer information and tax documents",
      icon: CiFileOn,
    },
    {
      title: "Notifications",
      description:
        "Choose notification preferences and how you want to be contacted",
      icon: AiOutlineNotification,
    },
    {
      title: "Privacy & sharing",
      description:
        "Manage your personal data, connected services and data sharing settings",
      icon: FiEye,
    },
  ];

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Account</h1>
      <p className="text-gray-600 mb-4">
        Mah Moud, mmoud2031@gmail.com ·{" "}
        <a href="#" className="text-blue-500">
          Go to profile
        </a>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <AccountBox key={index} {...card} />
        ))}
      </div>
    </Container>
  );
};

export default AccountCards;
