import React, { useContext } from "react";
import { Job } from "../models/Job";
import { AuthContext } from "../context/AuthContext";
import { jobApplicationApi } from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DisplayJobDescriptionProps {
  job: Job;
}

const DisplayJobDescription = ({ job }: DisplayJobDescriptionProps) => {
  const { job_id, role, city, country, posted_by, description, date_posted } =
    job;

  console.log(job);
  const authContext = useContext(AuthContext);
  const employee_id = authContext?.user.employee_id;

  const handleApply = async () => {
    try {
      const response = await jobApplicationApi.post(
        "api/job-applications/apply-job",
        {
          job_id: job_id,
          employee_id: employee_id,
          role: role,
        }
      );
      toast("Application Submitted Successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-2 shadow-md min-h-[750px] max-h-screen mx-4 px-6 py-2 overflow-y-scroll relative rounded-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold ">{role.toUpperCase()}</h1>
        <p className="text-lg text-blue-600 font-bold">
          {city},{country}
        </p>

        <p>Posted By - {posted_by}</p>
        <div className="my-2 w-full ">
          <h1 className="font-bold text-lg border-t border-b py-2 rounded-md px-2">
            Job Description
          </h1>
          <p className="my-2">{description}</p>
        </div>
      </div>
      <div className="absolute right-0 top-0">
        <button
          onClick={handleApply}
          className="px-4 py-2 border-2 bg-gray-800 text-white rounded-xl my-2 mx-2 transition-all hover:bg-gray-950 hover:scale-105"
        >
          Apply
        </button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default DisplayJobDescription;
