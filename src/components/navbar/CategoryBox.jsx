import React, { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";

export default function CategoryBox({ icon: Icon, label, selected }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleClick = useCallback(() => {
    // Define an empty query
    let currentQuery = {};

    // Look for the current params and parse them to string
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    // If the clicked category is already selected, remove it
    if (currentQuery.category === label) {
      delete updatedQuery.category;
    }

    // Build the new URL with updated query parameters
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // Navigate to the new URL
    navigate(url);
  }, [label, params, navigate]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}
