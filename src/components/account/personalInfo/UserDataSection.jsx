/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";

function UserDataSection({ currentUser }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      displayName: currentUser?.displayName || "",
      preferredName: "",
      email: currentUser?.email || "",
      phoneNumbers: "",
      governmentID: "",
      address: "",
      emergencyContact: "",
    },
  });

  const [editField, setEditField] = useState(null);

  const onSubmit = (data) => {
    console.log("Updated user data:", data);
    //TODO: Update user data in Firestore
    setEditField(null);
  };

  const handleEditClick = (field) => {
    setEditField(field);
  };

  return (
    <div className="lg:col-span-8">
      <div className="text-3xl font-semibold mb-6">Personal info</div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Legal Name */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">Legal name</div>
            {editField === "displayName" ? (
              <input
                type="text"
                {...register("displayName")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">
                {currentUser?.displayName || "Not provided"}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("displayName")}
          >
            {editField === "displayName" ? "Save" : "Edit"}
          </button>
        </div>

        {/* Preferred Name */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">Preferred name</div>
            {editField === "preferredName" ? (
              <input
                type="text"
                {...register("preferredName")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">Not provided</div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("preferredName")}
          >
            {editField === "preferredName" ? "Save" : "Add"}
          </button>
        </div>

        {/* Email Address */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">Email address</div>
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
                  : "Not provided"}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("email")}
          >
            {editField === "email" ? "Save" : "Edit"}
          </button>
        </div>

        {/* Phone Numbers */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">Phone numbers</div>
            {editField === "phoneNumbers" ? (
              <input
                type="text"
                {...register("phoneNumbers")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">Not provided</div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("phoneNumbers")}
          >
            {editField === "phoneNumbers" ? "Save" : "Add"}
          </button>
        </div>

        {/* Government ID */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">Government ID</div>
            {editField === "governmentID" ? (
              <input
                type="text"
                {...register("governmentID")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">Not provided</div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("governmentID")}
          >
            {editField === "governmentID" ? "Save" : "Add"}
          </button>
        </div>

        {/* Address */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">Address</div>
            {editField === "address" ? (
              <input
                type="text"
                {...register("address")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">Not provided</div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("address")}
          >
            {editField === "address" ? "Save" : "Edit"}
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="flex justify-between items-center border-b py-4">
          <div>
            <div className="text-sm text-gray-500">Emergency contact</div>
            {editField === "emergencyContact" ? (
              <input
                type="text"
                {...register("emergencyContact")}
                className="text-lg border border-gray-300 rounded p-1 transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="text-lg">Not provided</div>
            )}
          </div>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => handleEditClick("emergencyContact")}
          >
            {editField === "emergencyContact" ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDataSection;
