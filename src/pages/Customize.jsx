import React, { useRef, useContext, useState } from "react";
import Card from "../compnents/card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";  
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import { FaFileUpload } from "react-icons/fa";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Customize() {
  const { selectImage, setSelectImage } = useContext(UserDataContext);
  const navigate = useNavigate();
  const InputImage = useRef(null);

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setSelectImage(file); // ✅ file ko context me save kar rahe
    }
  };

  const handleUploadClick = () => {
    InputImage.current.click();
  };

  const predefinedImages = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-blue-950 flex flex-col items-center py-8 md:py-16 px-4">
      
      {/* 🔹 Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 text-center drop-shadow-lg">
        Select Your Assistant Image
      </h1>

      {/* 🔹 Images Grid */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Predefined Images */}
        {predefinedImages.map((img, idx) => (
          <Card 
            key={idx} 
            image={img} 
            selected={selectImage === img}
            onClick={() => setSelectImage(img)}
          />
        ))}

        {/* Upload Box */}
        <div
          onClick={handleUploadClick}
          className={`cursor-pointer w-full aspect-[3/4] flex flex-col items-center justify-center 
            bg-gradient-to-b from-blue-900 to-blue-950 border border-blue-500 rounded-2xl 
            shadow-lg shadow-blue-500/40 hover:scale-105 hover:shadow-blue-400/70 
            transition-transform duration-300 overflow-hidden
            ${uploadedImage && selectImage instanceof File ? "border-4 border-white shadow-white/80" : ""}`}  
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="assistant"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <>
              <FaFileUpload className="text-white w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xs sm:text-sm md:text-base text-white mt-2">
                Upload Image
              </span>
            </>
          )}
        </div>

        {/* Hidden Input */}
        <input
          type="file"
          accept="image/*"
          ref={InputImage}
          className="hidden"
          onChange={handleImage}
        />
      </div>

      {/* 🔹 Next Button */}
      <button
        disabled={!selectImage}
        onClick={() => navigate("/customize2")}
        className={`min-w-[160px] sm:min-w-[180px] md:min-w-[200px] h-12 sm:h-14 md:h-16 rounded-full 
          text-white font-semibold text-sm sm:text-base md:text-lg shadow-lg mt-10 
          transition-all duration-300 ease-in-out
          ${selectImage 
            ? "bg-gradient-to-r from-cyan-700 to-blue-900 shadow-blue-500/40 hover:scale-105 hover:shadow-cyan-400/70 cursor-pointer" 
            : "bg-gray-500 opacity-50 cursor-not-allowed"}`}
      >
        Next
      </button>
    </div>
  );
}

export default Customize;
