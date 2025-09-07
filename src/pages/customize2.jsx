import React, { useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

function Customize2() {
  const { userData, setUserData, selectImage } = useContext(UserDataContext);
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const navigate = useNavigate();

 const serverUrl =
  import.meta.env.VITE_SERVER_URL ||
  "https://echomind-backend.vercel.app";

  const handleUpdateAssistant = async () => {
    try {
      const formData = new FormData();
      formData.append("assistantName", assistantName);

      if (selectImage instanceof File) {
        formData.append("assistantImage", selectImage); // ✅ upload wali file
      } else if (typeof selectImage === "string") {
        formData.append("imageUrl", selectImage); // ✅ predefined image
      }

      const res = await axios.post(
        `${serverUrl}/api/user/UpdateAssistant`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Assistant updated successfully:", res.data);
      setUserData(res.data);
      navigate("/");
    } catch (error) {
      console.error("Error updating assistant:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-blue-950 flex flex-col items-center py-10 px-4 relative">
      
      {/* 🔙 Back button */}
      <IoArrowBackSharp
        className="absolute top-6 left-4 sm:top-8 sm:left-8 text-white w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition"
        onClick={() => navigate("/customize")}
      />

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center mb-6 drop-shadow-lg">
        Enter Your Assistant Name
      </h1>

      {/* ✅ Selected Image Preview */}
      {selectImage && (
        <img
          src={selectImage instanceof File ? URL.createObjectURL(selectImage) : selectImage}
          alt="assistant"
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-cyan-400 shadow-lg shadow-cyan-600/40 mb-6"
        />
      )}

      {/* Input Box */}
      <input
        type="text"
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        placeholder="Type assistant name..."
        className="w-[90%] max-w-md h-12 sm:h-14 px-4 rounded-lg 
          text-white bg-gradient-to-r from-blue-900 to-blue-950 
          border border-blue-700 shadow-md shadow-blue-900/40 
          focus:outline-none focus:ring-2 focus:ring-cyan-500 text-base sm:text-lg mb-6"
      />

      {/* Create Button */}
      <button
        disabled={!assistantName}
        onClick={handleUpdateAssistant}
        className={`w-[90%] max-w-md h-12 sm:h-14 rounded-full font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 ease-in-out
          ${assistantName 
            ? "bg-gradient-to-r from-cyan-700 to-blue-900 text-white hover:scale-105 hover:shadow-cyan-400/70" 
            : "bg-gray-500 opacity-50 cursor-not-allowed"
          }`}
      >
        Finally, Your Assistant is Created
      </button>
    </div>
  );
}

export default Customize2;
