import { useState } from "react";
import Container from "./Container";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdPrivacyTip,
} from "react-icons/md";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const { t } = useTranslation();

  return (
    <footer className="bg-gray-200 p-4 sticky bottom-0 left-0 w-full ">
      <Container>
        <div
          className={`absolute bottom-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out bg-gray-200 ${
            isExpanded ? "h-48" : "h-0"
          }`}
          style={{ maxHeight: isExpanded ? "20vh" : "0" }}
        >
          <ul className="list-none p-4 space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t("helpCenter")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Airbnb.org
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t("cancellationOptions")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t("safetyInformation")}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center px-4">
          <div className="flex row gap-3">
            <p>© 2024 Airbnb, Inc.</p>
            <p>·</p>
            <a
              href="https://www.airbnb.com/help/article/2908"
              className="hover:underline"
            >
              {t("Terms")}
            </a>
            <p>·</p>
            <a
              href="https://www.airbnb.com/help/sale-share-opt-out#article-content"
              className="hover:underline flex row gap-2 items-center"
            >
              {t("yourPrivacy")} <MdPrivacyTip size={18} />
            </a>
          </div>
          <div className="flex row gap-2 items-center">
            {!isExpanded && (
              <>
                <button
                  className="underline text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={toggleExpand}
                >
                  {t("supportResources")}
                </button>
                <MdKeyboardArrowUp size={24} />
              </>
            )}
            {isExpanded && (
              <>
                <button
                  className="underline text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={toggleExpand}
                >
                  {t("supportResources")}
                </button>
                <MdKeyboardArrowDown size={24} />
              </>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
