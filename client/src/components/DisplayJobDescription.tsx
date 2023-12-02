import React from "react";
import { Job } from "../models/Job";

interface DisplayJobDescriptionProps {
  job: Job;
}

const DisplayJobDescription = ({ job }: DisplayJobDescriptionProps) => {
  const { role, city, country, posted_by, description, date_posted } = job;

  return (
    <div className="border-2 shadow-md min-h-[750px] max-h-screen mx-4 px-6 py-2 overflow-y-scroll relative rounded-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold ">{role.toUpperCase()}</h1>
        <p className="text-lg text-blue-600 font-bold">{country}</p>
        <p>{city}</p>
        <p>Posted By - {posted_by}</p>
        <div className="my-2 w-full ">
          <h1 className="font-bold text-lg border-t border-b py-2 rounded-md px-2">
            Job Description
          </h1>
          <p className="my-2">{description}</p>
        </div>
      </div>
      <div className="absolute right-0 top-0">
        <button className="px-4 py-2 border-2 bg-gray-800 text-white rounded-xl my-2 mx-2 transition-all hover:bg-gray-950 hover:scale-105">
          Apply
        </button>
      </div>
    </div>
  );
};

export default DisplayJobDescription;
