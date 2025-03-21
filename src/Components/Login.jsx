import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axiosinstance from "../axios/axioxinstanse";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const countryOptions = [
  {
    value: "IN",
    label: (
      <div className="flex items-center gap-1">
        <img
          src="https://flagcdn.com/w40/in.png"
          alt="India Flag"
          className="w-6 h-4 rounded-sm"
        />
        <span>+91</span>
      </div>
    ),
  },
];

export default function Login() {
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: async (data) => {
      const res = await axiosinstance.post("user/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('id', data.user.id);
      toast.success("Login Successful");
      navigate("/questions"); 
    },
    onError: () => {
      toast.error("login wrong");
    },
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      login.mutate(values);
    },
  });

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative">
      <div className="absolute top-8 left-8 bg-white rounded p-2">
        <img
          src="/5641ceb76e39893bb5f7238e4da0f5b5.png"
          alt="Logo"
          className="w-[180px] md:w-[250px] h-auto object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative inline-block text-[31px] font-semibold text-[#2A586F] mb-2">
          <h1 className="relative z-50">Login</h1>
          <span className="absolute left-0 bottom-1 w-full h-2 bg-[#fac166] z-0"></span>
        </div>

        <div className="flex flex-col items-center gap-8 p-8 shadow-lg bg-white rounded-md max-w-sm w-full">
          <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
            <label className="text-[18px] font-bold">Phone Number</label>
            <div className="flex gap-2 flex-row items-center">
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={(newValue) => setSelectedCountry(newValue)}
                className="md:w-[110px] w-[75px] text-gray-800 "
                isSearchable={false}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "2px solid #c4c4c4",
                    borderRadius: "6px",
                    boxShadow: "none",
                    backgroundColor: "white",
                    marginTop: "0.5rem",
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                }}
              />

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <small className="text-red-500">{formik.errors.phoneNumber}</small>
            )}

            <label className="text-[18px] font-bold mt-4">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-red-500">{formik.errors.password}</small>
            )}

            <button
              type="submit"
              className="mt-8 py-2 font-semibold text-[14px] bg-[#2A586F] text-white border-2 border-[#2A586F] hover:bg-transparent hover:text-[#2A586F] rounded-md"
            >
              Login
            </button>
            <small className="text-center mt-5">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-600">
                Register Now
              </Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}
