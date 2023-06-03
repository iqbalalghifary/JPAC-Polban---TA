import { Injectable } from '@nestjs/common';
import { JobApplication } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';

@Injectable()
export class JobApplicationUseCases {
  constructor(
    private dataServices: IDataServices
  ) {}

  getAllJobApplications(): Promise<JobApplication[]> {
    return this.dataServices.jobApplications.getAll();
  }

  getJobApplicationById(id: any): Promise<JobApplication> {
    return this.dataServices.jobApplications.get(id);
  }

  createJobApplication(JobApplication: JobApplication): Promise<JobApplication> {
    return this.dataServices.jobApplications.create(JobApplication);
  }

  updateJobApplication(JobApplicationId: string, JobApplication: JobApplication): Promise<JobApplication> {
    return this.dataServices.jobApplications.update(JobApplicationId, JobApplication);
  }

  deleteJobApplication(id: any): Promise<JobApplication> {
    return this.dataServices.jobApplications.delete(id);
  }

}
