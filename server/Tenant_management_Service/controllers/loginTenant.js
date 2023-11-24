import bcrypt from "bcryptjs";

const loginTenant = async (req, res, db) => {
  const { email, password } = req.body;
  try {
    const user = await db("tenants").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      console.log(user);
      res.status(200).json({
        message: "Login successful",
        tenantName: user.tenantName,
        email: user.email,
        date_joined: user.date_joined,
        status: true,
        tenant_id: user.tenant_id,
      });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during tenant login:", error);
    res.status(500).json({ error: "Can't process login request" });
  }
};

export default loginTenant;
