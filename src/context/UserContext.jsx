import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "https://ai-backend-production-6448.up.railway.app";

  // ✅ ek hi axios instance
  const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true, // har request ke saath cookies jayengi
  });

  const [userData, setUserData] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backendImage, setBackImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const res = await api.get("/api/user/current");
      console.log("Current user:", res.data);
      setUserData(res.data);
    } catch (err) {
      console.error("❌ Error fetching user:", err.response?.data || err.message);
    }
  };

  const getGeminiResponse = async (command) => {
    try {
      const result = await api.post("/api/user/askAssistant", { command });
      return result.data;
    } catch (error) {
      console.log("❌ Gemini API error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackImage,
    frontImage,
    setFrontImage,
    selectImage,
    setSelectImage,
    getGeminiResponse,
    api, // 🔥 export bhi kar diya taake baaki components direct api use kar saken
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
