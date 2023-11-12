import { useState } from "react";
import jobs from "../mockdata/jobs.json";
import DisplayJobCard from "./DisplayJobCard"; // Fix the import statement
import { Job } from "../models/Job";
import DisplayJobDescription from "./DisplayJobDescription";
type Props = {};

const DisplayJobs = (props: Props) => {
  const [selectedJob, setSelectedJob] = useState<Job>();

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <div className="flex w-full px-6 py-2">
      <div className="w-4/12">
        {jobs.map((job, idx) => (
          <div
            className="cursor-pointer transition-all bg-slate-100 hover:bg-slate-200 rounded-lg"
            key={idx}
            onClick={() => handleJobClick(job)}
          >
            <DisplayJobCard job={job} />
          </div>
        ))}
      </div>

      <div className="w-8/12">
        <DisplayJobDescription job={selectedJob} />
      </div>
    </div>
  );
};

export default DisplayJobs;
