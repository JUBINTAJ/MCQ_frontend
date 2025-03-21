import { useState } from "react";
import { countryOptions } from "./Login";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../axios/axioxinstanse";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  username: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits")
    .required("Phone number is required"),
  status: Yup.string().required("Please select a status"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  const register = useMutation({
    mutationFn: async (data) => {
      const res = await axiosinstance.post("user/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registration Successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4  relative">
      <div className="absolute top-4 left-4">
        <img
          src="/5641ceb76e39893bb5f7238e4da0f5b5.png"
          alt="Logo"
          className="w-[150px] md:w-[180px] h-auto object-contain"
        />
      </div>

      <div className="mb-6">
        <h1 className="relative inline-block text-3xl font-bold">
          Register
          <span className="absolute left-0 bottom-1 w-full h-2 bg-[#fac166] -z-10"></span>
        </h1>
      </div>

      <div className="relative w-[90%] max-w-[450px] bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <Formik
          initialValues={{ username: "", email: "", phoneNumber: "", status: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            register.mutate(values);
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="text-[16px] font-semibold">Full Name</label>
                <Field
                  type="text"
                  name="username"
                  className="p-2 w-full border-2 rounded-md mt-1 outline-none"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="username" component="small" className="text-red-500" />
              </div>

              <div>
                <label className="text-[16px] font-semibold">Email</label>
                <Field
                  type="text"
                  name="email"
                  className="p-2 w-full border-2 rounded-md mt-1 outline-none"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="small" className="text-red-500" />
              </div>

              <div>
                <label className="text-[16px] font-semibold">Phone Number</label>
                <div className="flex gap-2 mt-1">
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(newValue) => setSelectedCountry(newValue)}
                    className="w-[80px] md:w-[100px]"
                    isSearchable={false}
                  />
                  <Field
                    type="tel"
                    name="phoneNumber"
                    className="p-2 w-full border-2 rounded-md outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                <ErrorMessage name="phoneNumber" component="small" className="text-red-500" />
              </div>

              <div>
                <label className="text-[16px] font-semibold">Current Status</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Field type="radio" name="status" value="student" className="hidden" />
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          values.status === "student" ? "bg-gray-800" : "bg-transparent"
                        }`}
                      ></div>
                    </div>
                    <span>Student</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Field type="radio" name="status" value="employee" className="hidden" />
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          values.status === "employee" ? "bg-gray-800" : "bg-transparent"
                        }`}
                      ></div>
                    </div>
                    <span>Employee</span>
                  </label>
                </div>
                <ErrorMessage name="status" component="small" className="text-red-500" />
              </div>

              <div>
                <label className="text-[16px] font-semibold">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="p-2 w-full border-2 rounded-md mt-1 outline-none"
                  placeholder="Enter Password"
                />
                <ErrorMessage name="password" component="small" className="text-red-500" />
              </div>

              <button
                type="submit"
                className="mt-3 py-2 font-semibold text-[14px] bg-[#2A586F] text-white border-2 rounded-md"
              >
                Register
              </button>
              <small className="text-center mt-2">
                Already have an account? <Link to="/login" className="text-blue-600">Login Now</Link>
              </small>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
