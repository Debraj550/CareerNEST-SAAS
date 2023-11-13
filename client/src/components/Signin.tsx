import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import WelcomeBoard from "./WelcomeBoard";

type Props = {};

interface UserSignin {
  email: string;
  password: string;
}

const Signin = (props: Props) => {
  const [user, setUser] = useState<UserSignin>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  //console.log(user);

  return (
    <div className="flex justify-center gap-10 my-10">
      <WelcomeBoard />
      <div className="bg-slate-100  p-4 rounded-xl w-3/12">
        <div className="p-4 text-center border-b-2 mb-4">
          <h1 className="font-bold text-gray-600 text-lg">
            Log in to your account
          </h1>
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

        <div className="flex justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg my-4 w-full hover:bg-blue-800">
            Sign In
          </button>
        </div>
        <div>
          <div className="flex justify-center">
            <p>
              New to CareerNEST?{" "}
              <Link
                className="text-blue-600 hover:text-blue-800 font-bold"
                to={"/signup"}
              >
                Sign Up.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
