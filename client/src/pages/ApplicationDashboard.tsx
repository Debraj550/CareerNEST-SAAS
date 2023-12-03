import React, { useContext, useEffect, useState } from "react";
import { jobApplicationApi } from "../api/axios";
import { AuthContext } from "../context/AuthContext";

type Props = {};
interface Application {
  application_id: number;
  role: number;
  application_date: string;
  status: string;
}

const ApplicationDashboard = (props: Props) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const authContext = useContext(AuthContext);
  const employee_id = authContext?.user.employee_id;
  const fetchApplications = async () => {
    try {
      const response = await jobApplicationApi.get(
        "/api/job-applications/get-all-job-application-status",
        {
          params: {
            employee_id: employee_id,
          },
        }
      );
      console.log(response.data);
      setApplications(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="flex flex-col mx-10 justify-center px-2 py-2 items-center">
      <div className="bg-slate-100 shadow-md rounded-lg w-full text-center py-2">
        <h1 className="font-semibold text-xl">Application Dashboard</h1>
      </div>
      <div className="w-full">
        {applications.length > 0 ? (
          <div>
            {applications.map((application, idx) => {
              return (
                <div
                  key={application.application_id}
                  className="flex border-b-2 my-4 py-2 px-4"
                >
                  <div className="w-4/12">
                    <h1 className="font-mono font-bold text-center">
                      {application.role.toString().toUpperCase()}
                    </h1>
                  </div>
                  <div className="w-4/12">
                    <h1 className="text-center">
                      {application.application_date.slice(0, 10)}
                    </h1>
                  </div>
                  <div className="w-4/12">
                    <h1 className="text-center text-blue-700">
                      {application.status}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Nothing to show </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDashboard;
