import { useState, useRef, useEffect } from "react";
import i18next from "i18next";
import { FaEarthAfrica } from "react-icons/fa6";
import cookies from "js-cookie";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربيه",
    country_code: "sa",
    dir: "rtl",
  },
];
const DropdownWithIcon = () => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center  w-full text-sm font-sm "
      >
        <FaEarthAfrica className="mr-2 h-5 w-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdownButton"
          >
            {languages.map((language) => (
              <button
                className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                key={language.code}
                onClick={() => {
                  i18next.changeLanguage(language.code);
                }}
                disabled={language.code == currentLanguage.code}
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithIcon;
