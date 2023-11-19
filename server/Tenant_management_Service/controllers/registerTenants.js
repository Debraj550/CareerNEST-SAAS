import bcrypt from "bcryptjs";

const registerTenant = async (req, res, db) => {
  const { tenantName, email, password } = req.body;
  if (!tenantName || !email || !password) {
    return res.status(400).json("Incorrect Fom Submission Values");
  }

  const hasedPassword = bcrypt.hashSync(password, 10);
  try {
    const response = await db("tenants").insert({
      tenantName: tenantName,
      email: email,
      password: hasedPassword,
      date_joined: new Date(),
    });

    res.status(200).json("Successfully Registered and Created login entry");
  } catch (e) {
    console.error("Error during tenant registration:", e);
    res.status(500).json({ error: "Can't Register Or Create a Login Entry" });
  }
};

export default registerTenant;
