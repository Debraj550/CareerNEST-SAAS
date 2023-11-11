import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  console.log("header rendered");

  return (
    <div className="px-4 py-6 border border-b">
      <div className="flex justify-between">
        <div className="font-bold text-3xl">
          <Link to={"/"}>
            Career<span className="text-blue-500">NEST</span>
          </Link>
        </div>
        <div className="w-3/12">
          <input
            type="text"
            className="border-2 border-gray-300 px-2 py-1 w-full rounded-md"
          ></input>
        </div>
        <div>
          <div className="text-lg flex gap-6">
            <div>Jobs</div>
            <div>Resume</div>
            <div>My Profile</div>
            <div>Log Out</div>
          </div>
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
        </div>
      </div>
    </div>
  );
};
