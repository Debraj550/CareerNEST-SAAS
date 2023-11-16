import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Header: React.FC = () => {
  const [isLoggedin] = useAuth();
  const [isAdmin] = useAuth();
  return (
    <div className="px-4 py-6 border border-b">
      <div className="flex justify-between">
        <div className="font-bold text-3xl">
          <Link to={"/"}>
            <h1 className="transition-all hover:scale-100">
              Career<span className="text-blue-500">NEST</span>
            </h1>
          </Link>
        </div>
        {isLoggedin ? (
          <>
            <div className="w-4/12 ">
              <div className="flex relative">
                <input
                  type="text"
                  className="border border-gray-500 px-2 py-2 w-full rounded-lg"
                ></input>
                <button className="absolute right-0 top-0 bottom-0 px-3 py-1 ">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg flex gap-6">
                {isAdmin && (
                  <Link
                    className="px-2 py-1 border-b-2 border-gray-400 rounded-xl "
                    to="/admin"
                  >
                    <h1 className="transition-all hover:scale-95">Admin</h1>
                  </Link>
                )}
                <Link
                  className="px-2 py-1 border-b-2 border-gray-400 rounded-xl "
                  to="/jobs"
                >
                  <h1 className="transition-all hover:scale-95">Jobs</h1>
                </Link>
                <Link
                  className="px-2 py-1 border-b-2 border-gray-400 rounded-xl"
                  to="/resume"
                >
                  <h1 className="transition-all hover:scale-95">Resume</h1>
                </Link>
                <Link
                  className="px-2 py-1 border-b-2 border-gray-400 rounded-xl"
                  to="/jobs"
                >
                  <h1 className="transition-all hover:scale-95">My Profile</h1>
                </Link>
                <Link
                  className="px-2 py-1 border border-red-800  rounded-xl transition-all hover:bg-slate-100"
                  to="/jobs"
                >
                  <h1 className="transition-all hover:scale-95">Logout</h1>
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
