import React, { useContext, useEffect, useState } from "react";
import { tenantApi } from "../api/axios";
import TenantCard from "../components/TenantCard";
import Lottie from "lottie-react";
import spinner from "../static/spinner.json";
import { AuthContext } from "../context/AuthContext";
import { Tenant } from "../models/Tenant";

const AdminPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const authContext = useContext(AuthContext);
  const tenant_id = authContext?.user.tenant_id;

  const fetchTenantData = async () => {
    try {
      const response = await tenantApi.get("/api/tenant/get-tenant-services", {
        params: {
          tenant_id: tenant_id,
        },
      });
      const data = await response?.data?.data;
      const requestInstance = response.data["os"];
      console.log(data);
      console.log("Request Instace - ", requestInstance);
      setTenants(data);
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
            {tenants.map((tenant: Tenant, idx: number) => {
              return (
                <div key={idx}>
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
