const getJobDetails = async (req, res, db) => {
  const { tenant_id } = req.query; // Use req.query instead of req.params
  try {
    const jobDetails = await db
      .select("*")
      .from("job_details")
      .where("tenant_id", tenant_id);
    res.status(200).json(jobDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to fetch job details");
  }
};

export default getJobDetails;
