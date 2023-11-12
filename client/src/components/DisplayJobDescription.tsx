import React from "react";
import { Job } from "../models/Job";

interface DisplayJobDescriptionProps {
  job: Job | undefined;
}

const DisplayJobDescription = ({ job }: DisplayJobDescriptionProps) => {

  return (
    <div className="border-2 shadow-md min-h-screen mx-4 px-6 py-2 ">
      DisplayJobDescription
    </div>
  );
};

export default DisplayJobDescription;
