import React from "react";
import { Job } from "../models/Job";

interface DisplayJobCardProps {
  job: Job;
}

const DisplayJobCard = ({ job }: DisplayJobCardProps) => {
  const { job_title, company, location } = job;
  const formattedCompanyName: string =
    company.slice(0, 1).toUpperCase() + company.slice(1).toLowerCase();
  return (
    <div className="px-4 py-2 mb-2">
      <h1 className="text-lg font-bold">{job_title.toUpperCase()}</h1>
      <p className="text-blue-600 font-bold">{formattedCompanyName}</p>
      <p className="">{location ? location : ""}</p>
    </div>
  );
};

export default DisplayJobCard;
