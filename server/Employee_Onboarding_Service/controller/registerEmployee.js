import bcrypt from "bcryptjs";

const regissterEmployee = async (req, res, db) => {
  const { first_name, last_name, email, tenant_id } = req.body;
  if (!first_name || !last_name || !email || !tenant_id) {
    return res.status(400).json("Incorrect Fom Submission Values");
  }

  const hasedPassword = bcrypt.hashSync(process.env.DEFAULT_PASSWROD, 10);
  try {
    const response = await db("employeeRegister").insert({
      first_name: first_name,
      last_name: last_name,
      email: email,
      tenant_id: tenant_id,
      password: hasedPassword,
    });

    res.status(200).json("Successfully Registered and Created login entry");
  } catch (e) {
    console.error("Error during tenant registration:", e);
    res.status(500).json({ error: "Can't Register Or Create a Login Entry" });
  }
};

export default regissterEmployee;
