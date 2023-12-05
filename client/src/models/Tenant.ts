export interface Tenant {
  tenant_id: number;
  service_name: string;
  loadbalancer_type: string;
  autoscaling: boolean;
}
