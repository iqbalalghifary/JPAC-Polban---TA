import { Injectable } from '@nestjs/common';
import { Experience } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';

@Injectable()
export class ExperienceUseCases {
  constructor(
    private dataServices: IDataServices,
  ) {}

  getAllExperiences(): Promise<Experience[]> {
    return this.dataServices.experiences.getAll();
  }

  getExperienceById(id: any): Promise<Experience> {
    return this.dataServices.experiences.get(id);
  }

  createExperience(experience: Experience): Promise<Experience> {
    return this.dataServices.experiences.create(experience);
  }

  updateExperience(data: any): Promise<Experience> {
    return this.dataServices.experiences.updateOne(data.id, data.payload);
  }

  deleteExperience(id: any): Promise<Experience> {
    return this.dataServices.experiences.delete(id);
  }

}