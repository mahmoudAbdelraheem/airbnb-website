import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
function HostAbout({ host }) {
  const { t } = useTranslation();

  return (
    <>
      {/* About Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          {t("About")} {host.name}
        </h3>
        <p className="text-gray-700">{host.about}</p>
      </div>
    </>
  );
}

export default HostAbout;
