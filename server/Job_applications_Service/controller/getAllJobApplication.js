const getAllJobApplication = async (req, res, db) => {
  const { employee_id } = req.query;
  try {
    const applicationDetails = await db
      .select("*")
      .from("job_applications")
      .where("employee_id", employee_id);
    res.status(200).json(applicationDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to fetch job details");
  }
};

export default getAllJobApplication;
