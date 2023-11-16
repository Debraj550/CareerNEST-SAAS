import React, { useEffect, useState } from "react";
import { tenantApi } from "../api/axios";
import TenantCard from "../components/TenantCard";

interface Tenants {
  id: number;
  country_name: string;
}

const AdminPage = () => {
  const [tenants, setTenants] = useState<Tenants[]>([]);

  const fetchTenantData = async () => {
    const response = await tenantApi.get("/api/tenant/get-all-tenants");
    const data = await response?.data;
    setTenants(data);
  };

  useEffect(() => {
    fetchTenantData();
  }, []);
  return (
    <div className="p-4 mx-4">
      <div className="my-2 p-2 border-b-2">
        <h1 className="font-bold text-2xl">Tenant Management Portal</h1>
      </div>
      <div>
        {tenants &&
          tenants.map((tenant: Tenants) => {
            return (
              <div key={tenant.id}>
                <TenantCard tenant={tenant} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminPage;
