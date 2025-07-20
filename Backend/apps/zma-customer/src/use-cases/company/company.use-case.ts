import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';
import { firstValueFrom } from 'rxjs';

import { IDataServices } from '../../core/abstracts';
import { CompanyInput } from '../../core/inputs';
import { Company } from '../../core/models';

import { CompanyFactoryService } from './company-factory.user-case.service';

@Injectable()
export class CompanyUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: CompanyFactoryService,
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

  async getCompany(id: string): Promise<Company> {
    const tenantId = 'your_tenant_id_here';

    const entity = await this.dataServices.companyService.findById({ tenantId, id });

    if (!entity) {
      throw new Exception(`Company with id ${id} not found`);
    }

    return this.factoryService.transform(entity);
  }

  async getCompanies({ ids }: { ids: string[] }): Promise<Company[]> {
    const tenantId = 'your_tenant_id_here';

    const entities = await this.dataServices.companyService.findMany({
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

  async getAllCompanies(pagination: Pagination): Promise<Company[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.companyService.findMany({
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


  async searchCompanies({
    input,
    pagination,
  }: {
    input: string;
    pagination: Pagination;
  }): Promise<Company[]> {
    const tenantId = 'your_tenant_id_here';

    const { limit, skip } = pagination;
    const entities = await this.dataServices.companyService.findMany({
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

  async createCompany(input: CompanyInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newCompany = {
      ...input,
      isDeleted: false,
    };

    const existingCompany = await this.dataServices.companyService.findOne({
      tenantId,
      find: { filter: { name: newCompany.name, isDeleted: false } },
    });

    if (existingCompany) {
      return false;
    } else {
      const entity = await this.dataServices.companyService.create({ tenantId, item: newCompany });
      return !!entity;
    }
  }

  async updateCompany({
    input,

    id,
  }: {
    input: CompanyInput;

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

  async deleteCompanies(ids: string[]): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.companyService.updateMany({
      tenantId,
      filter: { _id: { $in: ids } },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }

}
