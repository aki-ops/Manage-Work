import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { IDataServices } from '../../core/abstracts';
import { DocumentInput } from '../../core/inputs';
import { DocumentModel } from '../../core/models';

import { DocumentFactoryService } from './class-factory.user-case.service';

@Injectable()
export class DocumentUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: DocumentFactoryService,
  ) {}


  async getAllDocumentInClass(pagination: Pagination, classId: string): Promise<DocumentModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;

    const entities = await this.dataServices.documentService.findMany({
      tenantId,
      find: {
        filter: {
          classId: classId,
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


  async searchDocument({
    input,
    pagination,
  }: {
    input: string;
    pagination: Pagination;
  }): Promise<DocumentModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { limit, skip } = pagination;
    const entities = await this.dataServices.documentService.findMany({
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

  async addDocumentToClass(input: DocumentInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newDocument = {
      ...input,
      isDeleted: false,
    };

    const existingDocument = await this.dataServices.documentService.findOne({
      tenantId,
      find: { filter: { classId: newDocument.classId, senderId: newDocument.senderId, isDeleted: false } },
    });

    if (existingDocument) {
      return false;
    } else {
      const entity = await this.dataServices.documentService.create({tenantId, item: newDocument});
      return !!entity;
    }
  }


  async deleteDocumentFromClass(documentId: string): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.documentService.updateMany({
      tenantId,
      filter: { _id: documentId, isDeleted: false },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }

}