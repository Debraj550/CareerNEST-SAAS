import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { employeeOnboardApi } from "../api/axios";
import dp from "../static/profile_pic_icon.png";

type Props = {};

interface Employee {
  address: string;
  date_joined: string;
  date_of_birth: string;
  department: string;
  employee_id: 14;
  first_name: string;
  last_name: string;
  phone_number: string;
  position: string;
}

const ProfilePage = (props: Props) => {
  const authContext = useContext(AuthContext);
  const employee_id = authContext?.user.employee_id;
  const [employee, setEmployee] = useState<Employee>();
  const fetchProfileDetails = async () => {
    try {
      const response = await employeeOnboardApi.get(
        "/api/onboard/get-employee-details",
        {
          params: {
            employee_id: employee_id,
          },
        }
      );
      setEmployee(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  return (
    <div className="px-4 py-2">
      <div className="bg-slate-100 flex items-center gap-2 my-1">
        <div className="w-20">
          <img src={dp} alt="profile_pic"></img>
        </div>
        <div>
          <h1>{employee?.first_name + " " + employee?.last_name}</h1>
        </div>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Date Of Joining: </h1>{" "}
        <span className="">
          {employee?.date_joined.toString().slice(0, 10)}
        </span>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Address: </h1>{" "}
        <span className="">{employee?.address}</span>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Phone: </h1>{" "}
        <span className="">{employee?.phone_number}</span>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Designation: </h1>{" "}
        <span className="">{employee?.position}</span>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Department: </h1>{" "}
        <span className="">{employee?.department}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
