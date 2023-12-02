import { useContext, useEffect, useState } from "react";
import jobs from "../mockdata/jobs.json";
import DisplayJobCard from "./DisplayJobCard"; // Fix the import statement
import { Job } from "../models/Job";
import DisplayJobDescription from "./DisplayJobDescription";
import Lottie from "lottie-react";
import joblitte from "../static/joblottie.json";
import { jobsApi } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
type Props = {};

const DisplayJobs = (props: Props) => {
  const [selectedJob, setSelectedJob] = useState<Job>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const authContext = useContext(AuthContext);
  const tenant_id = authContext?.user.tenant_id;

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const fetchJobs = async () => {
    try {
      const response = await jobsApi.get("/api/job_post/get-job", {
        params: {
          tenant_id: tenant_id,
        },
      });
      if (response.data) setJobs(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

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
        {selectedJob ? (
          <DisplayJobDescription job={selectedJob} />
        ) : (
          <div className="border-2 shadow-md min-h-[750px] max-h-screen mx-4 px-6 py-2 overflow-y-auto relative">
            <h1 className="text-center font-bold text-xl my-4">
              Click on a Job on the left side to find more about it.
            </h1>
            <div>
              <Lottie className="h-96" animationData={joblitte} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayJobs;
