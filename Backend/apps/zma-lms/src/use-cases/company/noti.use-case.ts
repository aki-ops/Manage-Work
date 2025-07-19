import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { IDataServices } from '../../core/abstracts';
import { NotificationInput } from '../../core/inputs';
import { NotiModel } from '../../core/models';

import { NotificationFactoryService } from './class-factory.user-case.service';

@Injectable()
export class NotificationUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: NotificationFactoryService,
  ) {}



  async getAllNotification(pagination: Pagination, classId): Promise<NotiModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.notiService.findMany({
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


  async createNotification(input: NotificationInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newNotification = {
      ...input,
      isDeleted: false
    };

    const existingNotification = await this.dataServices.notiService.findOne({
      tenantId,
      find: { filter: { classId: newNotification.classId, senderId: newNotification.senderId, isDeleted: false } },
    });

    if (existingNotification) {
      return false;
    } else {
      const entity = await this.dataServices.notiService.create({tenantId, item: newNotification});
      return !!entity;
    }
  }

}
