import React, { useState } from "react";
import { Tenant } from "../models/Tenant";

interface TenantCardProps {
  tenant: Tenant;
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  const { service_name, loadbalancer_type, autoscaling } = tenant;

  const [lbMethod, setLbMethod] = useState<string>(loadbalancer_type);
  const [autoScalingEnabled, setAutoScalingEnabled] =
    useState<boolean>(autoscaling);

  const handleLbMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLbMethod(e.target.value);
  };
  const handleAutoMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAutoScalingEnabled(e.target.value === "1" ? true : false);
  };

  const handleUpdate = () => {};

  return (
    <div className="px-4 py-4 my-2 flex items-center border-b-2 gap-16 justify-between">
      <h1 className="font-bold w-2/12">{service_name}</h1>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-bold">Load Balancing Method - </p>
        <label>
          <select
            className="border-2 border-gray-500 px-4 py-1 rounded-lg "
            value={lbMethod}
            onChange={handleLbMethod}
          >
            <option value="round_robin">Round Robin</option>
            <option value="random">Random</option>
            <option value="least_conn">Weighted Least Connected</option>

            {/* Add more load balancing methods as needed */}
          </select>
        </label>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-bold">Autoscalar Method- </p>
        <label>
          <select
            className="border-2 border-gray-500 px-4 py-1 rounded-lg "
            onChange={handleAutoMethod}
          >
            <option value="" disabled>
              Select Autoscaling
            </option>
            <option value="1">Enable</option>
            <option value="0">Disable</option>
            {/* Add more load balancing methods as needed */}
          </select>
        </label>
      </div>
      <div className="w-2/12">
        <button
          onClick={handleUpdate}
          className="text-white bg-blue-700 px-4 py-2 rounded-xl"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default TenantCard;
