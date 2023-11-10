import React, { ChangeEvent, useState } from "react";

type Props = {};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const Signup = (props: Props) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  console.log(user);
  return (
    <div className="bg-slate-100  p-4 rounded-xl w-3/12">
      <div className="p-4 text-center border-b-2 mb-4">
        <h1 className="font-bold text-gray-600 text-lg">Signup</h1>
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg my-4 w-full">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
