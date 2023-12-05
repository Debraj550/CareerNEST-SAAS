import React, { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { employeeOnboardApi } from "../api/axios";

interface Employee {
  first_name: string;
  last_name: string;
  email: string;
  tenant_id: number | undefined;
}

const EmployeeOnboarding = () => {
  const authContext = useContext(AuthContext);
  const tenant_id = authContext?.user.tenant_id;
  const [employee, setEmployee] = useState<Employee>({
    first_name: "",
    last_name: "",
    email: "",
    tenant_id: tenant_id,
  });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const handleOnboarding = async () => {
    try {
      const response = await employeeOnboardApi.post(
        "/api/onboard/employee-register",
        employee
      );
      if (response?.status === 200) {
        setSuccess(true);
        alert("Registered successfully");
      } else {
        alert("Email already exists.");
      }
      setEmployee({
        first_name: "",
        last_name: "",
        email: "",
        tenant_id: tenant_id,
      });
    } catch (err) {
      console.log(err);
      setError(true);
      setSuccess(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(false);
    setSuccess(false);
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 mx-4 flex flex-col justify-center items-center">
      <div className="my-2 p-2 border-b-2">
        <h1 className="font-bold text-2xl">Employee Onboarding Portal</h1>
      </div>

      <div className="gap-2 bg-slate-100 w-fit px-4 py-2 flex flex-col items-center">
        <h1 className="text-xl font-semibold py-2">
          Fill in the Employee Details
        </h1>

        <div className="mb-4">
          <div className="flex gap-6">
            <div className="">
              <h1 className="text-sm font-semibold py-2">First Name</h1>
              <input
                name="first_name"
                type="text"
                className="border border-gray-400  px-2 rounded-md py-1 "
                value={employee.first_name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="">
              <h1 className="text-sm font-semibold py-2">Last Name</h1>
              <input
                name="last_name"
                type="text"
                className="border border-gray-400  px-2 rounded-md py-1 "
                value={employee.last_name}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold py-2">Email</h1>
            <input
              name="email"
              type="email"
              className="border border-gray-400 px-2 rounded-md py-1 w-full"
              onChange={handleChange}
              value={employee.email}
            ></input>
          </div>
        </div>

        <button
          onClick={handleOnboarding}
          className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-600 hover:scale-105"
        >
          Register Employee
        </button>
      </div>
    </div>
  );
};
export default EmployeeOnboarding;
