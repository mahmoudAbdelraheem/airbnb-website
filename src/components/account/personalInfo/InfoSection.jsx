import eyeImage from "../../../assets/eye.png";
import scureImage from "../../../assets/scure.png";
import lockImage from "../../../assets/lock.png";
import { useTranslation } from "react-i18next";

function InfoSection() {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-4">
      <div className="p-12 bg-white border rounded-lg space-y-4">
        <div>
          <img
            src={scureImage}
            className="w-12 h-12 rounded-full mb-4"
            alt="Info"
          />
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-gray-800 font-semibold text-2xl">
              {t("q1")}
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-6">{t("pq1")}</p>
          <hr />
        </div>
        <div>
          <img
            src={lockImage}
            className="w-12 h-12 rounded-full mb-4"
            alt="Info"
          />
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-gray-800 font-semibold text-2xl">
              {t("q2")}
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-6">{t("pq2")}</p>
          <hr />
        </div>
        <div>
          <img
            src={eyeImage}
            className="w-12 h-12 rounded-full mb-4"
            alt="Info"
          />
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-gray-800 font-semibold text-2xl">
              {t("q3")}
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-6">{t("pq3")}</p>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
