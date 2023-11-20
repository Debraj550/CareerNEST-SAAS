import React, { useEffect, useState } from "react";
import { tenantApi } from "../api/axios";
import TenantCard from "../components/TenantCard";
import Lottie from "lottie-react";
import spinner from "../static/spinner.json";

interface Tenants {
  id: number;
  country_name: string;
}

const AdminPage = () => {
  const [tenants, setTenants] = useState<Tenants[]>([]);

  const fetchTenantData = async () => {
    try {
      const response = await tenantApi.get("/api/tenant/get-all-tenants");
      const data = await response?.data;
      setTenants(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTenantData();
  }, []);
  return (
    <div className="p-4 mx-4">
      <div className="my-2 p-2 border-b-2">
        <h1 className="font-bold text-2xl">Service Management Portal</h1>
      </div>
      <div>
        {tenants.length > 0 ? (
          <>
            {tenants.map((tenant: Tenants) => {
              return (
                <div key={tenant.id}>
                  <TenantCard tenant={tenant} />
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-fit">
            <Lottie animationData={spinner} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
