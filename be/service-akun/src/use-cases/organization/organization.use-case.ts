import { Injectable } from '@nestjs/common';
import { Organization } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';

@Injectable()
export class OrganizationUseCases {
  constructor(
    private dataServices: IDataServices,
  ) {}

  getAllOrganizations(): Promise<Organization[]> {
    return this.dataServices.organizations.getAll();
  }

  getOrganizationById(id: any): Promise<Organization> {
    return this.dataServices.organizations.get(id);
  }

  createOrganization(organiation: Organization): Promise<Organization> {
    return this.dataServices.organizations.create(organiation);
  }

  updateOrganization(organiationId: string, organiation: Organization): Promise<Organization> {
    return this.dataServices.organizations.update(organiationId, organiation);
  }

  deleteOrganization(id: any): Promise<Organization> {
    return this.dataServices.organizations.delete(id);
  }

}
