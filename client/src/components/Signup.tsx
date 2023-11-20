import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import WelcomeBoard from "./WelcomeBoard";
import { tenantApi } from "../api/axios";     
import "react-toastify/dist/ReactToastify.css";

type Props = {};

interface User {
  tenantName: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const Signup = (props: Props) => {
  const [user, setUser] = useState<User>({
    tenantName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setError(false);
    setSuccess(false);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const url = "/api/tenant/register-tenant";
    if (
      !user.email ||
      !user.tenantName ||
      !user.password ||
      !user.confirmpassword
    ) {
      setError(true);
      return;
    }
    if (user.password === user.confirmpassword)
      try {
        const response = await tenantApi.post(url, {
          tenantName: user.tenantName,
          email: user.email,
          password: user.password,
        });
        console.log(response);
        if (response?.status === 200) {
          setSuccess(true);
        }

      } catch (err) {
        setError(true);
        setSuccess(false);
        console.log(err);
      }
  };
  //console.log(user);
  return (
    <div className="flex justify-center gap-10 my-10 mx-8">
      <div className="w-9/12">
        <WelcomeBoard />
      </div>

      <div className="bg-slate-100 p-4 rounded-xl w-3/12 flex flex-col gap-1">
        <div className="p-4 text-center border-b-2 mb-4">
          <h1 className="font-bold text-gray-600 text-lg">
            Onboard your business
          </h1>
        </div>
        <div className="">
          <div>
            <h1 className="text-sm font-semibold py-2">Organization Name</h1>
            <input
              className="px-2 py-1 border-gray-300 border w-full"
              type="text"
              name="tenantName"
              value={user.tenantName}
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        <div>
          <h1 className="text-sm font-semibold py-2">Service Account Email</h1>
          <input
            className="px-2 py-1 border-gray-300 border w-full"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
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
        {error && (
          <div className="text-red-600 font-bold">
            * Invalid email or password.
          </div>
        )}
        {success && (
          <div className="text-white bg-green-600 font-bold px-4 py-2">
            {" "}
            Successfully registered.
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg my-4 w-full hover:bg-blue-800"
            onClick={handleSignup}
          >
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
