import bcrypt from "bcryptjs";
export const loginEmployee = async (req, res, db) => {
  const { email, password } = req.body;
  try {
    const user = await db("employeeRegister").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      console.log(user);
      res.status(200).json({
        message: "Login successful",
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        status: true,
        tenant_id: user.tenant_id,
        employee_id: user.employee_id,
      });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during tenant login:", error);
    res.status(500).json({ error: "Can't process login request" });
  }
};
