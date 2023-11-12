import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Header: React.FC = () => {
  const [isLoggedin] = useAuth();

  return (
    <div className="px-4 py-6 border border-b">
      <div className="flex justify-between">
        <div className="font-bold text-3xl">
          <Link to={"/"}>
            Career<span className="text-blue-500">NEST</span>
          </Link>
        </div>
        {isLoggedin ? (
          <>
            <div className="w-3/12">
              <input
                type="text"
                className="border-2 border-gray-300 px-2 py-1 w-full rounded-md"
              ></input>
            </div>
            <div>
              <div className="text-lg flex gap-6">
                <Link
                  className="px-2 py-1 border-b-2 border-gray-400 rounded-xl "
                  to="/jobs"
                >
                  <h1 className="transition-all hover:scale-105">Jobs</h1>
                </Link>
                <Link
                  className="px-2 py-1 border-b-2 border-gray-400 rounded-xl"
                  to="/jobs"
                >
                  <h1 className="transition-all hover:scale-105">Resume</h1>
                </Link>
                <Link
                  className="px-2 py-1 border-b-2 border-gray-400 rounded-xl"
                  to="/jobs"
                >
                  <h1 className="transition-all hover:scale-105">My Profile</h1>
                </Link>
                <Link
                  className="px-2 py-1 border-2 border-red-500 rounded-xl transition-all hover:bg-slate-100"
                  to="/jobs"
                >
                  Logout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-lg flex gap-4">
            <Link
              to={"/signup"}
              className="transition-all hover:bg-slate-100 px-4 py-2 rounded-full"
            >
              Join Now
            </Link>
            <Link
              to={"/signin"}
              className="border border-blue-500 px-4 py-2 rounded-full transition-all hover:bg-slate-100 hover:border-blue-700"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
