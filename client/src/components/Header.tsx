import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="px-4 py-6 border border-b">
      <div className="flex justify-between">
        <div className="font-bold text-3xl">
          Career<span className="text-blue-500">NEST</span>
        </div>
        <div className="">
          <div className="text-lg flex gap-4">
            <button className="transition-all hover:bg-slate-100 px-4 py-2 rounded-full">
              Join Now
            </button>
            <button className="border border-blue-500 px-4 py-2 rounded-full transition-all hover:bg-slate-100 hover:border-blue-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
