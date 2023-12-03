const applyJob = async (req, res, db) => {
  const { employee_id, job_id } = req.body;
  if (!employee_id || !job_id) {
    res.status(400).json("Missing job id or employee id");
    return;
  }
  try {
    const response1 = await db("job_applications").insert({
      job_id: job_id,
      employee_id: employee_id,
    });
    res.status(200).json("Successfully Registered and Created login entry");
  } catch (err) {
    res.status(500).json("Error getting details");
  }
};

export default applyJob;
