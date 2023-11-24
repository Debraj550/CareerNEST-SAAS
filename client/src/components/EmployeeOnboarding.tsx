import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type Props = {};

const EmployeeOnboarding = (props: Props) => {
  const authContext = useContext(AuthContext);
  console.log(authContext?.user);
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
        <button>Onboard</button>
      </div>
    </div>
  );
};
export default EmployeeOnboarding;
