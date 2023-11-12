import React from "react";
import jobs from "../mockdata/jobs.json";
import DisplayJobCard from "./DisplayJobCard"; // Fix the import statement
type Props = {};

const DisplayJobs = (props: Props) => {
  console.log(jobs);
  return (
    <div className="w-4/12 px-6 py-2">
      {jobs.map((job, idx) => (
        <div
          className="cursor-pointer transition-all bg-slate-100 hover:bg-slate-200 rounded-lg"
          key={idx}
        >
          <DisplayJobCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default DisplayJobs;
