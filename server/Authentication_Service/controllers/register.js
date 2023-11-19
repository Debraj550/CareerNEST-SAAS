export const registerHandler = async (req, res, db, bcrypt) => {
  const { fname, lname, email, country, is_recruiter, is_admin, password } =
    req.body;

  if (!fname || !lname || !email || !country || !password) {
    return res.status(400).json("Incorrect Fom Submission Values");
  }

  const hash = bcrypt.hashSync(password, 10);
  try {
    // Inserting to Register DB

    const response = await db("users").insert({
      fname: fname,
      lname: lname,
      email: email,
      country: country,
      is_recruiter: is_recruiter,
      is_admin: is_admin,
      joined: new Date(),
    });

    // Inserting to login DB

    const response2 = await db("login").insert({
      email: email,
      hash: hash,
    });
    res.status(200).json("Successfully Registered and Created login entry");
  } catch (e) {
    res.status(404).json({ error: "Can't Register Or Create a Login Entry" });
  }
};
