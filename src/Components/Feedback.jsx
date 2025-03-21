import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../axios/axioxinstanse";
import { toast } from "react-toastify";

export default function Success() {
  const [selectedRating] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score] = useState(localStorage.getItem("mark")) || 0;
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const emojis = [
    { rating: 1, emoji: "😢", label: "Very Dissatisfied" },
    { rating: 2, emoji: "😔", label: "Dissatisfied" },
    { rating: 3, emoji: "😐", label: "Neutral" },
    { rating: 4, emoji: "😊", label: "Satisfied" },
    { rating: 5, emoji: "😁", label: "Very Satisfied" },
  ];

  const handleEmojiClick = (emoji) => {
    setFeedback((prev) => prev + emoji);
  };

  const addFeedBack = useMutation({
    mutationFn: async (feedback) => {
      const res = await axiosinstance.post(`feedback/submit`, { feedback, score });
      console.log(res.data, "feedback response");
      return res.data;
    },
    onSuccess: () => {
      toast.success(`Feedback Submitted Successfully`);
      setFeedback("");
      navigate("/"); 

    },
    onError: () => {
      toast.error("Feedback not submitted");
    },
  });

  const handleSubmit = () => {
    if (feedback.trim().length === 0) return;
    addFeedBack.mutate(feedback);
  };

  const handleHome = () => {
    localStorage.removeItem("mark");
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center p-3 lg:p-0 relative">
      <div className="flex justify-between items-center w-full px-6 py-4 fixed top-0   z-50">
        <div>
          <img
            src="/5641ceb76e39893bb5f7238e4da0f5b5.png"
            alt="Logo"
            className="w-[150px] md:w-[200px] h-auto object-contain"
          />
        </div>

         <div className="flex items-center bg-gray-200 rounded-full p-1">
          <img
            src="/43842b144e86351c32dae20ee4a18bcc.png"
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>

       <div className="h-[100px]"></div>

       <div className="flex flex-col justify-center items-center gap-2 mt-6">
        <img src="/check.png" alt="Success" className="w-[70px]" />
        <p className="font-semibold text-[18px] text-center">
          Congratulations! You have Successfully Completed The Test
        </p>
        <p className="font-bold">
          Score: &nbsp;
          <span className="bg-[#fac166] px-4 py-1 font-semibold rounded-3xl">
            {score}/50
          </span>
        </p>
        <div className="font-bold text-[20px] text-white bg-[#2A586F] mt-2 rounded-md px-4 py-2">
          Your ID: {id}
        </div>
      </div>

       <div className="bg-white rounded-lg shadow-xl md:p-6 p-2 md:w-[60%] mt-6">
        <h2 className="text-xl font-bold">Feedback</h2>

        <div className="mt-3">
          <h3 className="text-xl font-bold tracking-wider">Give us a feedback!</h3>
          <p className="text-gray-600 text-justify">
            Your input is important for us. We take customer feedback very seriously.
          </p>
        </div>

         <div className="flex mt-5 mb-5 gap-3">
          {emojis.map((item) => (
            <button
              key={item.rating}
              onClick={() => handleEmojiClick(item.emoji)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                selectedRating === item.rating
                  ? "bg-[#2A586F]"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={item.label}
            >
              {item.emoji}
            </button>
          ))}
        </div>

         <div className="mb-2">
          <textarea
            className="w-full border-[#c4c4c4] border rounded-md p-4 h-24 focus:outline-none shadow-md"
            placeholder="Add a comment"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

         <button
          disabled={feedback.length === 0 || addFeedBack.isLoading}
          className={`md:w-1/3 bg-[#2A586F] lg:px-4 border px-1 py-2 rounded-md text-white font-bold text-sm ${
            feedback.length !== 0 && !addFeedBack.isLoading
              ? "hover:bg-transparent hover:text-[#2A586F] border-[#2A586F]"
              : "bg-[#2A586F] cursor-not-allowed"
          }`}
          onClick={handleSubmit}
        >
          {addFeedBack.isLoading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>

       <span
        onClick={handleHome}
        className="flex items-center gap-2 my-4 cursor-pointer"
      >
        <GoHome />
        <span>Back to home</span>
      </span>
    </div>
  );
}
