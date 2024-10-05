import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
function HostConfirmedInfo({ host }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        {host.name} {t("confirmedinformation")}
      </h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{t("Identity")}</span>
        </li>
        <li className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{t("Emailaddress")}</span>
        </li>
        <li className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{t("Phonenumber")}</span>
        </li>
      </ul>
      <a href="#" className="text-blue-500 hover:underline text-sm mt-4 block">
        {t("Learnaboutidentityverification")}
      </a>
    </div>
  );
}

export default HostConfirmedInfo;
