import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import WelcomeBoard from "./WelcomeBoard";

type Props = {};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  isRecruiter: boolean;
  password: string;
  confirmpassword: string;
}

const Signup = (props: Props) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    country: "India",
    isRecruiter: false,
    password: "",
    confirmpassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // isRecruiter: 1 (recrutier), 0 (applicant)
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  console.log(user);
  return (
    <div className="flex justify-center gap-10 my-10">
      <WelcomeBoard />
      <div className="bg-slate-100  p-4 rounded-xl w-3/12 flex flex-col gap-1">
        <div className="p-4 text-center border-b-2 mb-4">
          <h1 className="font-bold text-gray-600 text-lg">
            Create your account
          </h1>
        </div>
        <div className="flex gap-3">
          <div>
            <h1 className="text-sm font-semibold py-2">First Name</h1>
            <input
              className="px-2 py-1 border-gray-300 border w-full"
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <h1 className="text-sm font-semibold py-2">Last Name</h1>
            <input
              className="px-2 py-1 border-gray-300 border w-full"
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        <div>
          <h1 className="text-sm font-semibold py-2">Email</h1>
          <input
            className="px-2 py-1 border-gray-300 border w-full"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="">
          <h1 className="text-sm font-semibold py-2">Country</h1>
          <select
            className="w-full px-2 py-1 border-gray-300 border"
            name="country"
            id="country"
            value={user.country}
            onChange={handleChange}
            required
          >
            <option value="India">India (Default)</option>
            <option value="USA">USA</option>
            <option value="China">China</option>
            <option value="UK">UK</option>
            <option value="Brazil">Brazil</option>
          </select>
        </div>
        <div className="">
          <h1 className="text-sm font-semibold py-2">
            Are you seeking jobs or recruiting candidates?{" "}
          </h1>
          <select
            className="w-full px-2 py-1 border-gray-300 border"
            name="isRecruiter"
            id="isRecruiter"
            value={user.isRecruiter ? "1" : "0"}
            onChange={handleChange}
            required
          >
            <option value="0">Applicant</option>
            <option value="1">Recruiter</option>
          </select>
        </div>
        <div>
          <h1 className="text-sm font-semibold py-2">Password</h1>
          <input
            className="px-2 py-1 border-gray-300 border w-full"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <h1 className="text-sm font-semibold py-2">Confirm Password</h1>
          <input
            className="px-2 py-1 border-gray-300 border w-full"
            type="password"
            name="confirmpassword"
            value={user.confirmpassword}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg my-4 w-full hover:bg-blue-800">
            Sign Up
          </button>
        </div>
        <div>
          <div className="flex justify-center">
            <p>
              Already have an account?{" "}
              <Link
                className="text-blue-600 hover:text-blue-800 font-bold"
                to={"/signin"}
              >
                Sign In.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
