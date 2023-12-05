import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { jobsApi } from "../api/axios";

type Props = {};

const CreateJobsPage = (props: Props) => {
  const [formData, setFormData] = useState({
    role: "",
    posted_by: "",
    city: "",
    country: "",
    description: "",
  });
  const authContext = useContext(AuthContext);
  const tenant_id = authContext?.user.tenant_id;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRegister = async () => {
    const url = "/api/job-post-service/post-job";
    try {
      const formDataWithTenantId = {
        ...formData,
        tenant_id: tenant_id,
      };
      console.log("Form Data:", formDataWithTenantId);
      const response = await jobsApi.post(url, formDataWithTenantId);
      console.log(response);
    } catch (error) {
      console.error("Error registering job:", error);
    }
  };
  return (
    <div className="p-4 mx-4 flex justify-center flex-col items-center">
      <div className="my-2 p-2 border-b-2">
        <h1 className="font-bold text-2xl">Job Management Portal</h1>
      </div>

      <div className="gap-2 bg-slate-100 px-4 py-2 ">
        <h1 className="text-xl font-semibold py-2 text-center">
          Register Open Positions
        </h1>

        <div>
          <h1 className="text-sm font-semibold py-2">Role</h1>
          <input
            name="role"
            type="text"
            className="border border-gray-400 px-2 rounded-md py-1 w-full"
            value={formData.role}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <h1 className="text-sm font-semibold py-2">Posted By (Email)</h1>
          <input
            name="posted_by"
            type="email"
            className="border border-gray-400 px-2 rounded-md py-1 w-full"
            value={formData.posted_by}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex gap-6">
          <div>
            <h1 className="text-sm font-semibold py-2">City</h1>
            <input
              name="city"
              type="text"
              className="border border-gray-400 px-2 rounded-md py-1 w-full"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold py-2">Country</h1>
            <input
              name="country"
              type="text"
              className="border border-gray-400 px-2 rounded-md py-1 w-full"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <h1 className="text-sm font-semibold py-2">Job Description</h1>
          <textarea
            name="description"
            placeholder="Write Job Description here..."
            className="border border-gray-400 px-2 rounded-md py-1 w-full min-h-[150px]"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <button
          onClick={handleRegister}
          className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-600 hover:scale-105 mt-4"
        >
          Register Job
        </button>
      </div>
    </div>
  );
};

export default CreateJobsPage;
