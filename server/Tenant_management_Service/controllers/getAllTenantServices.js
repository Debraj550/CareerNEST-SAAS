import os from "os";

const getAllTenantServices = async (req, res, db) => {
  const { tenant_id } = req.query;
  console.log(tenant_id);
  try {
    const response = await db
      .select("*")
      .from("tenant_loadbalancer_mapping")
      .where("tenant_id", tenant_id);
    const newRes = { data: response, os: os.hostname() };
    res.status(200).json(newRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAllTenantServices;
