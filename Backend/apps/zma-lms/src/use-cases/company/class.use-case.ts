import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { IDataServices } from '../../core/abstracts';
import { ClassInput } from '../../core/inputs';
import { ClassModel} from '../../core/models';


import { ClassFactoryService } from './class-factory.user-case.service';


@Injectable()
export class ClassUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: ClassFactoryService,
  ) {}

  async getClass(id: string): Promise<ClassModel> {
    const tenantId = 'your_tenant_id_here';

    const entity = await this.dataServices.classService.findById({ tenantId, id });

    if (!entity) {
      throw new Exception(`Company with id ${id} not found`);
    }

    return this.factoryService.transform(entity);
  }


  async getAllClasses(pagination: Pagination): Promise<ClassModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.classService.findMany({
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

  async getAllClassesInTeacher(pagination: Pagination, teacherId: string): Promise<ClassModel[]> {
    const tenantId = 'your_tenant_id_here';
    const { skip, limit } = pagination;
    const entities = await this.dataServices.classService.findMany({
      tenantId,
      find: {
        filter: {
          teacherId: teacherId,
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


  async searchClasses({
    input,
    pagination,
  }: {
    input: string;
    pagination: Pagination;
  }): Promise<ClassModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { limit, skip } = pagination;
    const entities = await this.dataServices.classService.findMany({
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

  async createClass(input: ClassInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newClass = {
      ...input,
      isDeleted: false
    };

    const existingClass = await this.dataServices.classService.findOne({
      tenantId,
      find: { filter: { name: newClass.name, isDeleted: false } },
    });

    if (existingClass) {
      return false;
    } else {
      const entity = await this.dataServices.classService.create({tenantId, item: newClass});
      return !!entity;
    }
  }

  async updateClass({
    input,
    id,
  }: {
    input: ClassInput;

    id: string;
  }): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const existingClass = await this.dataServices.classService.findById({ tenantId, id });

    if (!existingClass) {
      throw new Exception(`Class with id ${id} not found`);
    }
    const updatedClass = {
      ...input,
    };
    const entity = await this.dataServices.classService.updateOne({
      tenantId,
      id,
      update: { item: updatedClass },
    });
    return !!entity;
  }

  async deleteClass(ids: string[]): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.classService.updateMany({
      tenantId,
      filter: { _id: { $in: ids } },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }

}

