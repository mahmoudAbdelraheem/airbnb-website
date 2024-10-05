/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// import { useNavigate } from "react-router-dom";
function UserDataSection({ currentUser, updatedData }) {
  const { t } = useTranslation();

  // const navigator = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      displayName: currentUser?.displayName || "",
      preferredName: currentUser?.preferredName || "",
      email: currentUser?.email || "",
      phoneNumbers: currentUser?.phoneNumbers || "",
      governmentID: currentUser?.governmentID || "",
      address: currentUser?.address || "",
      emergencyContact: currentUser?.emergencyContact || "",
    },
  });
  const saveText = t("Save");
  const editText = t("Edit");

  const [editField, setEditField] = useState(null);

  const onSubmit = async (data) => {
    console.log("Updated user data:", data);
    await updatedData(currentUser.uid, data);
    setEditField(null);
  };

  const handleEditClick = (field) => {
    if (editField === field) {
      handleSubmit(onSubmit)(); // If field is already in edit mode, submit it
    } else {
      setEditField(field); // Otherwise, set it to edit mode
    }
  };

  return (
    <div className="lg:col-span-8">
      <div className="text-3xl font-semibold mb-6">{t("personalinfo")}</div>

      <form className="space-y-4">
        {/* Legal Name */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">{t("Legalname")}</div>
            {editField === "displayName" ? (
              <input
                type="text"
                {...register("displayName")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.displayName || t("Notprovided")}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("displayName")}
          >
            {editField === "displayName" ? saveText : editText}
          </button>
        </div>

        {/* Preferred Name */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">{t("Preferredname")}</div>
            {editField === "preferredName" ? (
              <input
                type="text"
                {...register("preferredName")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.preferredName || t("Notprovided")}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("preferredName")}
          >
            {editField === "preferredName" ? saveText : editText}
          </button>
        </div>

        {/* Email Address */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">{t("Emailaddress")}</div>
            {editField === "email" ? (
              <input
                type="email"
                {...register("email")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.email
                  ? `${currentUser.email.substring(0, 1)}***@${
                      currentUser.email.split("@")[1]
                    }`
                  : t("Notprovided")}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("email")}
          >
            {editField === "email" ? saveText : editText}
          </button>
        </div>

        {/* Phone Numbers */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">{t("Phonenumber")}</div>
            {editField === "phoneNumbers" ? (
              <input
                type="text"
                {...register("phoneNumbers")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.phoneNumbers || t("Notprovided")}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("phoneNumbers")}
          >
            {editField === "phoneNumbers" ? saveText : editText}
          </button>
        </div>

        {/* Government ID */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">{t("GovernmentID")}</div>
            {editField === "governmentID" ? (
              <input
                type="text"
                {...register("governmentID")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.governmentID || t("Notprovided")}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("governmentID")}
          >
            {editField === "governmentID" ? saveText : editText}
          </button>
        </div>

        {/* Address */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">{t("Address")}</div>
            {editField === "address" ? (
              <input
                type="text"
                {...register("address")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.address || t("Notprovided")}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("address")}
          >
            {editField === "address" ? saveText : editText}
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">{t("Emergencycontact")}</div>
            {editField === "emergencyContact" ? (
              <input
                type="text"
                {...register("emergencyContact")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.emergencyContact || t("Notprovided")}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("emergencyContact")}
          >
            {editField === "emergencyContact" ? saveText : editText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDataSection;
