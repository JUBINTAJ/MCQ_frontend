import React, { useEffect, useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BiBookmark, BiLogOut } from "react-icons/bi";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosinstance from "../axios/axioxinstanse";
import { useNavigate, useSearchParams } from "react-router-dom";
import useWindowWidth from "../Components/hooks/usewindow";

export default function Questions() {
  const navigate = useNavigate();
  const symbols = [
    { id: 1, color: "text-green-600", label: "Attended" },
    { id: 2, color: "text-red-600", label: "Not Attended" },
    { id: 3, color: "text-gray-400", label: "Yet to Attend" },
  ];

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const windowWidth = useWindowWidth();
  const isLargeScreen = windowWidth >= 1000;
  const [mark, setMark] = useState(localStorage.getItem("mark") || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const pageNo = Number(searchParams.get("page")) || 0;
    setPage(pageNo);
  }, [searchParams]);

  useEffect(() => {
    setMark(localStorage.getItem("mark") || 0);
  }, []);

  useEffect(() => {
    setSidebarVisible(isLargeScreen);
  }, [isLargeScreen]);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await axiosinstance.get(`/question`);
      return res.data?.data || [];
    },
  });

  const { questions = [], totalQuestions } = data;

  const handleNext = (e) => {
    e.preventDefault();
    if (page === 9) {
      navigate(`/feedback`);
    } else {
      if (selectedAnswer === questions[page]?.answer) {
        setMark((prev) => Number(prev) + 5);
        localStorage.setItem("mark", `${Number(mark) + 5}`);
      }
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", String(page + 1));
      setSearchParams(newSearchParams);
      setSelectedAnswer(null);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (page !== 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", String(page - 1));
      setSearchParams(newSearchParams);
      setSelectedAnswer(null);
    }
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosinstance.post("user/logout");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Logout successful!");
      localStorage.clear();
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  const handleLogout = () => {
    setDropdownVisible(false);
    logoutMutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="relative bg-white flex flex-col min-h-screen">
      <div className="flex justify-between items-start sm:items-center fixed sm:relative top-4 left-4 right-4 z-50 px-4 sm:px-6">
        <div className="flex-1">
          <img
            src="/5641ceb76e39893bb5f7238e4da0f5b5.png"
            alt="Logo"
            className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] h-auto object-contain"
          />
        </div>

        <div className="relative flex justify-end items-center p-1 sm:p-2 bg-gray-200 h-12 sm:h-16 md:h-20 rounded-full cursor-pointer mt-2 sm:mt-0">
          <img
            src="/43842b144e86351c32dae20ee4a18bcc.png"
            alt="Profile"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          />
          {dropdownVisible && (
            <div className="absolute right-0 top-12 sm:top-16 w-[100px] sm:w-[120px] bg-white shadow-md rounded-lg">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-2 text-red-600 hover:bg-gray-100 text-sm"
              >
                <BiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1">
        <aside
          className={`${
            sidebarVisible
              ? "w-full sm:w-64 md:w-72 border-r border-gray-200 fixed sm:relative pt-28"
              : "w-0 sm:w-0"
          } h-screen overflow-y-auto transition-all duration-300 bg-white z-40 shadow-lg sm:shadow-none`}
        >
          {sidebarVisible && (
            <div className="p-4">
              <button
                onClick={() => setSidebarVisible(false)}
                className="text-2xl absolute right-4 top-4 p-2 mt-16 rounded-full hover:bg-gray-100"
              >
                <MdOutlineSpaceDashboard />
              </button>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        const newSearchParams = new URLSearchParams(searchParams);
                        newSearchParams.set("page", String(num - 1));
                        setSearchParams(newSearchParams);
                        setSelectedAnswer(null);
                      }}
                      className={`aspect-auto py-2 rounded border flex items-center justify-center text-lg ${
                        num === page + 1 ? "bg-lime-100" : ""
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="mt-8 sm:mt-auto">
                  <div className="shadow-md p-3 rounded-md mt-6 sm:mt-48">
                    {symbols.map((symbol) => (
                      <div
                        key={symbol.id}
                        className="flex items-center gap-2 mt-1"
                      >
                        <FaCircle className={`${symbol.color} text-xs`} />
                        <span className="text-sm">{symbol.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="text-2xl fixed left-4 top-24 z-50 p-2 bg-white shadow-md rounded-full"
          >
            <MdOutlineSpaceDashboard />
          </button>
        )}

        <div className="flex-1 p-6 overflow-auto relative">
          <h1 className="flex justify-center text-xl md:text-2xl font-bold mb-6 text-gray-800">
            Assess Your
            <span className="relative inline-block ml-2">
              <span className="relative z-10 px-2">Intelligence</span>
              <span className="absolute left-0 right-0 bottom-1 h-[4px] md:h-[5px] bg-yellow-300 z-0 rounded-sm"></span>
            </span>
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="h-2 w-full md:w-[70%] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2A586F]"
                style={{
                  width: `${((page + 1) / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
            <div className="text-sm md:text-lg font-semibold">
              {page + 1}/{totalQuestions}
            </div>
            <div className="flex items-center bg-[#fac166] text-yellow-800 px-3 py-1 text-sm rounded-sm">
              <IoMdTime className="mr-1" />
              <span>5 Min</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 shadow-sm mb-4">
            <div className="flex items-start mb-3">
              <div className="bg-[#2A586F] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                {page + 1}
              </div>
              <h2 className="text-md md:text-lg font-medium">
                {questions[page]?.question}
              </h2>
            </div>

            <div className="space-y-3 bg-white p-3">
              {questions[page]?.options.map((option) => (
                <div
                  key={option}
                  className="p-3 rounded-md flex items-center cursor-pointer w-full md:w-60 group bg-gray-100 "
                  onClick={() => setSelectedAnswer(option)}
                >
                  <label className="flex items-center gap-2 cursor-pointer w-full group b">
                    <input
                      type="radio"
                      name="quiz-answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}
                      className="hidden group-[&:checked]:bg-[#2A586F] "
                    />
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center group-has-[:checked]:border-[#2A586F]">
                      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full group-has-[:checked]:bg-[#2A586F]"></div>
                    </div>
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <button>
              <BiBookmark className="text-2xl text-gray-400 " />
            </button>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-4 py-1 rounded text-white bg-[#2A586F]"
              >
                <IoArrowBack /> Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-1 rounded text-white bg-[#2A586F]"
              >
                Next <IoArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
