import Container from "../Container";
import { LiaAddressCardSolid } from "react-icons/lia";
import { MdOutlineSecurity, MdPayments } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { AiOutlineNotification } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import AccountBox from "./AccountBox";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccountCards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cards = [
    {
      title: t("personalinfo"),
      description: t("ppersonalinfo"),
      icon: LiaAddressCardSolid,
    },
    {
      title: t("logser"),
      description: t("plogser"),
      icon: MdOutlineSecurity,
    },
    {
      title: t("payment"),
      description: t("ppayment"),
      icon: MdPayments,
    },
    {
      title: t("Taxes"),
      description: t("pTaxes"),
      icon: CiFileOn,
    },
    {
      title: t("Notifications"),
      description: t("pNotifications"),
      icon: AiOutlineNotification,
    },
    {
      title: t("Privacysharing"),
      description: t("pPrivacysharing"),
      icon: FiEye,
    },
  ];

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">{t("Account")}</h1>
      <p className="text-gray-600 mb-4">
        Mah Moud, mmoud2031@gmail.com ·{" "}
        <a href="#" className="text-blue-500">
          {t("Gotoprofile")}
        </a>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <AccountBox
            key={index}
            {...card}
            onClick={() => {
              if (card.title === t("personalinfo")) {
                navigate("/account/personal-info");
              }
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default AccountCards;
