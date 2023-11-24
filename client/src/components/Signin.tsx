import React, { ChangeEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeBoard from "./WelcomeBoard";
import { tenantApi } from "../api/axios";
import { AuthContext } from "../context/AuthContext";

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
  const [isTenant, setIsTenant] = useState<string>("Employee");
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(false);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleIsTenant = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsTenant(e.target.value);
  };

  const handleSignIn = async () => {
    const url = isTenant === "Tenant" ? "/api/tenant/login-tenant" : "/";
    try {
      const response = await tenantApi.post(url, user);
      const data = response.data;
      if (data?.status) {
        authContext?.setUser({
          name: data.tenantName,
          email: data.email,
          date_joined: data.date_joined,
          status: data.status,
          isTenant: isTenant === "Tenant" ? 1 : 0,
          tenant_id: data.tenant_id,
        });
        navigate("/home");
      } else {
        setError(true);
        return;
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center gap-10 my-10 mx-8">
      <div className="w-9/12">
        <WelcomeBoard />
      </div>
      <div className="bg-slate-100 p-4 rounded-xl w-3/12">
        <div className="p-4 text-center border-b-2 mb-4">
          <h1 className="font-bold text-gray-600 text-lg">
            Log in to your account
          </h1>
        </div>
        <div>
          <h1 className="text-sm font-semibold py-2">
            Are you signing in as an Employee or Organization
          </h1>
          <select
            className="px-2 py-1 border-gray-300 border w-full"
            name="isTenant"
            id="isTenant"
            value={isTenant}
            onChange={handleIsTenant}
          >
            <option value="Emoloyee">Employee</option>
            <option value="Tenant">Tenant</option>
          </select>
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
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg my-4 w-full hover:bg-blue-800"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
        <div>
          <div className="flex justify-center">
            <p>
              Want to onboard as an Organization?{" "}
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
