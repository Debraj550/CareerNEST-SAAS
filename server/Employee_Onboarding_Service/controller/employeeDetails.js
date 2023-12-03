const employeeDetails = async (req, res, db) => {
  const { employee_id } = req.query;
  if (!employee_id) {
    res.status(500).json("No employee id");
    return;
  }
  try {
    const employeeDetails1 = await db
      .select("*")
      .from("employeedetails")
      .where("employee_id", employee_id);
    const employeeDetails2 = await db
      .select("first_name", "last_name")
      .from("employeeRegister")
      .where("employee_id", employee_id);

    // Combine the two sets of employee details
    const combinedDetails = {
      ...employeeDetails1[0],
      ...employeeDetails2[0],
    };

    res.status(200).json(combinedDetails);
  } catch (err) {
    res.status(500).json("No request could be made.");
  }
};

export default employeeDetails;
