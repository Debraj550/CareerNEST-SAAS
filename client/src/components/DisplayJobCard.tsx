import React from "react";
import { Job } from "../models/Job";

interface DisplayJobCardProps {
  job: Job;
}

const DisplayJobCard = ({ job }: DisplayJobCardProps) => {
  const { job_title, company, location } = job;
  return (
    <div className="px-4 py-2 my-2">
      <h1 className="text-lg font-bold">{job_title.toUpperCase()}</h1>
      <p className="text-blue-500 font-bold">
        {company.slice(0, 1).toUpperCase() + company.slice(1).toLowerCase()}
      </p>
      <p className="">{location ? location : ""}</p>
    </div>
  );
};

export default DisplayJobCard;
