import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
function HostCardInfo({ host }) {
  const { t } = useTranslation();

  return (
    <div className=" bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
      <img
        src={host.image || "https://via.placeholder.com/100"}
        alt="Host"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{host.name}</h2>
      <span className="text-gray-600 text-sm">
        {host.superhost ? "Superhost" : ""}
      </span>

      <div className="flex items-center gap-4 mt-4">
        <div className="text-center">
          <p className="text-xl font-semibold">{host.reviewsCount || 0}</p>
          <p className="text-sm text-gray-600">{t("Reviews")}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{host.rating || "4.9"} ⭐</p>
          <p className="text-sm text-gray-600">{t("Rating")}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{host.yearsHosting || 0}</p>
          <p className="text-sm text-gray-600">{t("Yearshosting")}</p>
        </div>
      </div>
    </div>
  );
}

export default HostCardInfo;
