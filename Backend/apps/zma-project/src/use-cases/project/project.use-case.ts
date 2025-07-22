import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';
import { firstValueFrom } from 'rxjs';

import { IDataServices } from '../../core/abstracts';
import { ProjectInput } from '../../core/inputs';
import { Project } from '../../core/models';

import { ProjectFactoryService } from './project-factory.use-case.service';

@Injectable()
export class ProjectUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: ProjectFactoryService,
  ) {}

  async testMicroservice(): Promise<string> {
    const response = await firstValueFrom(
      this.client.send('sample', {
        body: {
          name: 'John Doe',
        },
      }),
    );

    return response;
  }

  async getProject(id: string): Promise<Project> {
    const tenantId = 'your_tenant_id_here';

    const entity = await this.dataServices.projectService.findById({ tenantId, id });

    if (!entity) {
      throw new Exception(`Project with id ${id} not found`);
    }

    return this.factoryService.transform(entity);
  }

  async getProjects({ ids }: { ids: string[] }): Promise<Project[]> {
    const tenantId = 'your_tenant_id_here';

    const entities = await this.dataServices.projectService.findMany({
      tenantId,
      find: {
        filter: {
          _id: { $in: ids },
          isDeleted: false,
        },
      },
    });
    return entities.map((entity) => this.factoryService.transform(entity));
  }

  async getAllProject(pagination: Pagination): Promise<Project[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.projectService.findMany({
      tenantId,
      find: {
        filter: {
          isDeleted: false,
        },
      },
      options: {
        sort: { name: 1 },
        limit,
        skip,
      },
    });
    return entities.map((entity) => this.factoryService.transform(entity));
  }


  async searchProjects({
    input,
    pagination,
  }: {
    input: string;
    pagination: Pagination;
  }): Promise<Project[]> {
    const tenantId = 'your_tenant_id_here';


    const { limit, skip } = pagination;
    const entities = await this.dataServices.projectService.findMany({
      tenantId,
      find: {
        filter: {
          name: { $regex: input, $options: 'i' },
          isDeleted: false,
        },
      },
      options: {
        sort: { name: 1 },
        limit: limit,
        skip: skip,
      },
    });
    return entities.map((entity) => this.factoryService.transform(entity));
  }

  async createProject(input: ProjectInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newProject = {
      ...input,
      isDeleted: false,
    };

    const existingProject = await this.dataServices.projectService.findOne({
      tenantId,
      find: { filter: { name: newProject.name, isDeleted: false } },
    });

    if (existingProject) {
      return false;
    } else {
      const entity = await this.dataServices.projectService.create({ tenantId, item: newProject });
      return !!entity;
    }
  }

  async updateProject({
    input,

    id,
  }: {
    input: ProjectInput;

    id: string;
  }): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const existingProject = await this.dataServices.projectService.findById({ tenantId, id });

    if (!existingProject) {
      throw new Exception(`Company with id ${id} not found`);
    }
    const updatedCompany = {
      ...input,
    };
    const entity = await this.dataServices.projectService.updateOne({
      tenantId,
      id,
      update: { item: updatedCompany },
    });
    return !!entity;
  }

  async deleteProjects(ids: string[]): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.projectService.updateMany({
      tenantId,
      filter: { _id: { $in: ids } },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }

}
