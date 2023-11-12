import React from "react";
import { Job } from "../models/Job";

interface DisplayJobDescriptionProps {
  job: Job | any;
}

const DisplayJobDescription = ({ job }: DisplayJobDescriptionProps) => {
  const { job_title, company, location } = job;
  return (
    <div className="border-2 shadow-md min-h-screen mx-4 px-6 py-2 relative">
      <div className="mb-4">
        <h1 className="text-2xl font-bold ">{job_title.toUpperCase()}</h1>
        <p className="text-lg">{company}</p>
        <p>{location}</p>
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
