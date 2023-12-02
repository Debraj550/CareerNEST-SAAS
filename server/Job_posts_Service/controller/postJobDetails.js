const postJobDetails = async (req, res, db) => {
  const { tenant_id, role, city, country, description, posted_by } = req.body;
  if (!tenant_id || !role || !city || !country || !description || !posted_by) {
    return res.status(400).json("One or more fields are empty");
  }
  try {
    const response = await db("job_details").insert({
      tenant_id: tenant_id,
      role: role,
      city: city,
      country: country,
      description: description,
      date_posted: new Date(),
      posted_by: posted_by,
    });
    res.status(200).json("Successfully created a job");
  } catch (err) {
    return res.status(500).json("Couldnt find db/connection/table");
  }
};

export default postJobDetails;
