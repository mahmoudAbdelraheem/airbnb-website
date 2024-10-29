import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
import cookies from "js-cookie";
// eslint-disable-next-line react/prop-types
export default function CategoryBox({ label, labelAr, selected, imageUrl }) {
  const currentLang = cookies.get("i18next") || "en";
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    if (currentQuery.category === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    navigate(url);
  }, [label, params, navigate]);

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      {/* Image container with overlay */}
      <div className="relative w-10 h-10">
        {/* Image */}
        <img
          src={imageUrl}
          alt={label}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 hover:opacity-0 bg-gray-100 rounded-s ${
            selected ? "opacity-0" : "opacity-40"
          } transition-opacity`}
        />
      </div>

      <div className="font-medium text-sm">
        {currentLang === "en" ? label : labelAr}
      </div>
    </div>
  );
}
