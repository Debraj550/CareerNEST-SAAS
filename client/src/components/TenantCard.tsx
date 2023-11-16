import React, { useState } from "react";
import { Tenant } from "../models/Tenant";

interface TenantCardProps {
  tenant: Tenant;
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  const { id, country_name } = tenant;
  const [lbMethod, setLbMethod] = useState<string>("least_conn");
  const [autoMethod, setAutoMethod] = useState<string>("threshold_based");

  const handleLbMethod = (e: any) => {
    setLbMethod(e.target.value);
  };
  const handleAutoMethod = (e: any) => {
    setAutoMethod(e.target.value);
  };

  const handleUpdate = () => {};

  return (
    <div className="px-4 py-4 my-2 flex items-center border-b-2 gap-16">
      <h1 className="font-bold w-[30px]">{country_name}</h1>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-bold">Load Balancing Method - </p>
        <label>
          <select
            className="border-2 border-gray-500 px-4 py-1 rounded-lg "
            value={lbMethod}
            onChange={handleLbMethod}
          >
            <option value="least_conn">Weighted Least Connected</option>
            <option value="ip_hash">IP Hash</option>
            <option value="random">Random</option>
            {/* Add more load balancing methods as needed */}
          </select>
        </label>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-bold">Autoscalar Method- </p>
        <label>
          <select
            className="border-2 border-gray-500 px-4 py-1 rounded-lg "
            value={autoMethod}
            onChange={handleAutoMethod}
          >
            <option value="thresshold">Threshold-based rules</option>
            <option value="reinforcement">Reinforcement Learning</option>

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
