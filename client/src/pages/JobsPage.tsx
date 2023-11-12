import React from "react";
import DsiplayJobs from "../components/DsiplayJobs";
import DisplayJobDescription from "../components/DisplayJobDescription";

type Props = {};

const JobsPage = (props: Props) => {
  return (
    <div className="flex justify-between p-4 mx-10">
      <DsiplayJobs />
      <DisplayJobDescription />
    </div>
  );
};

export default JobsPage;
