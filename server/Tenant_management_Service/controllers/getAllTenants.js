import os from "os";

const getAllTenants = async (req, res, db) => {
  try {
    const response = await db.select("*").from("tenants");
    const newRes = { data: response, os: os.hostname() };
    res.status(200).json(newRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAllTenants;
