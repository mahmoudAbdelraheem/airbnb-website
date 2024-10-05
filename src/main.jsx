import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi) // passes i18n down to react-i18next
  .init({
    supportedLngs: ["en", "ar"],
    lng: document.querySelector("html").lang, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    detection: {
      order: [
        "querystring",
        "cookie",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
