import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isRecruiter: number;
  password: string;
  confirmpassword: string;
}

const Signup = (props: Props) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    isRecruiter: 0,
    password: "",
    confirmpassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isSelectElement = e.target instanceof HTMLSelectElement;
    // isRecruiter: 1 (recrutier), 0 (applicant)
    setUser((prevUser) => ({
      ...prevUser,
      [name]: isSelectElement ? Number(value) : value,
    }));
  };

  //console.log(user);
  return (
    <div className="bg-slate-100  p-4 rounded-xl w-3/12 flex flex-col gap-1">
      <div className="p-4 text-center border-b-2 mb-4">
        <h1 className="font-bold text-gray-600 text-lg">Create your account</h1>
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
        ></input>
      </div>
      <div className="">
        <h1 className="text-sm font-semibold py-2">
          Are you an seeking Jobs or looking for candidates?{" "}
        </h1>
        <select
          className="w-full px-2 py-1 border-gray-300 border"
          name="isRecruiter"
          id="isRecruiter"
          value={user.isRecruiter ? "1" : "0"}
          onChange={handleChange}
        >
          <option value="0">Exploring job opportunities</option>
          <option value="1">Seeking candidates for hiring positions</option>
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
  );
};

export default Signup;
