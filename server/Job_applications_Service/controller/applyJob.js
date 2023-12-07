const applyJob = async (req, res, db) => {
  const { employee_id, job_id, role } = req.body;
  console.log(job_id, employee_id, role);
  if (!employee_id || !job_id || !role) {
    res.status(400).json("Missing job id or employee id");
    return;
  }
  try {
    const response1 = await db("job_applications").insert({
      job_id: job_id,
      employee_id: employee_id,
      role: role,
    });
    res.status(200).json("Successfully Registered and Created login entry");
  } catch (err) {
    res.status(500).json("Error getting details");
  }
};

export default applyJob;
