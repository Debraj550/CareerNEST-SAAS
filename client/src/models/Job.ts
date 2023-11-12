export interface Job {
  job_id: number;
  posted_by: string;
  job_title: string;
  company: string;
  job_description: string;
  location?: string;
}
