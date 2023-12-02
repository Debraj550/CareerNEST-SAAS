import { Job } from "../models/Job";

interface DisplayJobCardProps {
  job: Job;
}

const DisplayJobCard = ({ job }: DisplayJobCardProps) => {
  const { role, country, city } = job;

  return (
    <div className="px-4 py-2 mb-2">
      <h1 className="text-lg font-bold">{role.toUpperCase()}</h1>
      <p className="text-blue-600 font-bold">{country}</p>
      <p className="">{city ? city : ""}</p>
    </div>
  );
};

export default DisplayJobCard;
