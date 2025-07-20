import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';
import { firstValueFrom } from 'rxjs';

import { IDataServices } from '../../core/abstracts';
import { UserInput } from '../../core/inputs';
import { User } from '../../core/models';

import { UserFactoryService } from './user-factory.user-case.service';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: UserFactoryService,
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

  async getUser(id: string): Promise<User> {
    const tenantId = 'your_tenant_id_here';

    const entity = await this.dataServices.userService.findById({ tenantId, id });

    if (!entity) {
      throw new Exception(`Company with id ${id} not found`);
    }

    return this.factoryService.transform(entity);
  }

  async getUsers({ ids }: { ids: string[] }): Promise<User[]> {
    const tenantId = 'your_tenant_id_here';

    const entities = await this.dataServices.userService.findMany({
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

  async getAllUsers(pagination: Pagination): Promise<User[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.userService.findMany({
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


  async searchUsers({
    input,
    pagination,
  }: {
    input: string;
    pagination: Pagination;
  }): Promise<User[]> {
    const tenantId = 'your_tenant_id_here';


    const { limit, skip } = pagination;
    const entities = await this.dataServices.userService.findMany({
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

  async createUser(input: UserInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newUser = {
      ...input,
      isDeleted: false,
    };

    const existingUser = await this.dataServices.userService.findOne({
      tenantId,
      find: { filter: { name: newUser.name, isDeleted: false } },
    });

    if (existingUser) {
      return false;
    } else {
      const entity = await this.dataServices.userService.create({ tenantId, item: newUser });
      return !!entity;
    }
  }

  async updateUser({
    input,

    id,
  }: {
    input: UserInput;

    id: string;
  }): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const existingCompany = await this.dataServices.companyService.findById({ tenantId, id });

    if (!existingCompany) {
      throw new Exception(`Company with id ${id} not found`);
    }
    const updatedCompany = {
      ...input,
    };
    const entity = await this.dataServices.companyService.updateOne({
      tenantId,
      id,
      update: { item: updatedCompany },
    });
    return !!entity;
  }

  async deleteUsers(ids: string[]): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.companyService.updateMany({
      tenantId,
      filter: { _id: { $in: ids } },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }

}
