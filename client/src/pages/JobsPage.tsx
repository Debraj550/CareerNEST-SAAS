import DsiplayJobs from "../components/DsiplayJobs";

type Props = {};

const JobsPage = (props: Props) => {
  return (
    <div className="flex justify-between p-4 mx-4">
      <DsiplayJobs />
    </div>
  );
};

export default JobsPage;
