"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const nav=useNavigate()

  const handlelogin=()=>{
    nav('/Login')
  }

  return (
    <div className="w-screen h-screen bg-white relative overflow-hidden">
      
      <div className="absolute top-8 left-8 bg-white rounded p-2 ">
        <img
          src="/5641ceb76e39893bb5f7238e4da0f5b5.png"
          alt="Logo"
          className="w-[180px] md:w-[250px] h-auto object-contain"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800 text-center">
  Welcome to{" "}
  <span className="relative inline-block">
    <span className="relative z-10 px-2">TSEEP MASTERY BOX</span>
    <span className="absolute left-0 right-0 bottom-0 sm:bottom-1 md:bottom-1.5 h-[4px] sm:h-[6px] md:h-[8px] bg-yellow-300 z-0 rounded-sm transition-all duration-300"></span>
  </span>
</h1>

        <p className="text-gray-600 text-xl">
          Unlock your potential with{" "}
          <span className="font-semibold">AI inspired tool</span>
        </p>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex flex-col md:flex-row items-center justify-between gap-4 p-6 border-t border-gray-400 max-w-6xl mx-auto">
        <div className="flex items-start gap-2 max-w-md">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 text-teal-700 border-gray-300 rounded focus:ring-teal-500"
          />
          <label htmlFor="terms" className="text-sm text-black font-bold">
            I confirm that I have read and accept the terms and conditions and privacy policy.
          </label>
        </div>

        <button
          disabled={!termsAccepted}
          className={`px-8 py-3 rounded text-white text-lg ${
            termsAccepted ? "bg-[#2A586F] " : "bg-gray-400 cursor-not-allowed"
          }`} onClick={handlelogin}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
