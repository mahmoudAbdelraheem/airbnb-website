import { useState } from "react";
import Container from "./Container";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <footer className="relative bg-gray-200 p-4">
      <Container>
        <div
          className={`
            absolute bottom-full left-0 w-full 
            overflow-hidden transition-all duration-300 ease-in-out bg-gray-200 ${
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
                Help Center
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
                Cancellation Options
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Safety Information
              </a>
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center px-4">
          <p>© 2024 Airbnb. All rights reserved.</p>
          <button
            className="underline text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleExpand}
          >
            Support & Resources
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
