import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

type Props = {};

const EmployeeOnboarding = (props: Props) => {
  const authContext = useContext(AuthContext);
  console.log(authContext?.user);
  const handleOnboarding = () => {};
  return (
    <div className="p-4 mx-4">
      <div className="my-2 p-2 border-b-2">
        <h1 className="font-bold text-2xl">Employee Onboarding Portal</h1>
      </div>
      <div>
        <h1 className="text-sm font-semibold py-2">Employee Details</h1>
        <div className="flex gap-6">
          <div>First Name</div>
          <div>Last Name</div>
        </div>

        <div>Email</div>
        <button
          onClick={handleOnboarding}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-600 hover:scale-105"
        >
          Onboard
        </button>
      </div>
    </div>
  );
};
export default EmployeeOnboarding;
