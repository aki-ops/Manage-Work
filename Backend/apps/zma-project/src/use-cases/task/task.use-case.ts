import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';
import { firstValueFrom } from 'rxjs';

import { IDataServices } from '../../core/abstracts';
import { TaskInput } from '../../core/inputs';
import { Task } from '../../core/models';

import { TaskFactoryService } from './task-factory.use-case.service';

@Injectable()
export class TaskUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: TaskFactoryService,
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

  async getTask(id: string, projectId : string): Promise<Task> {
    const tenantId = 'your_tenant_id_here';

    const entity = await this.dataServices.taskService.findOne({
      tenantId,
      find: {
        filter: {
          _id: id,
          projectId: projectId,
          isDeleted: false,
        },
      },
    });
    if (!entity) {
      throw new Exception(`Task with id ${id} not found`);
    }

    return this.factoryService.transform(entity);
  }

  async getTasks({ ids }: { ids: string[] }, projectId : string, pagination : Pagination): Promise<Task[]> {
    const tenantId = 'your_tenant_id_here';

    const entities = await this.dataServices.taskService.findMany({
      tenantId,
      find: {
        filter: {
          _id: { $in: ids },
          projectId: projectId,
          isDeleted: false,
        },
      },
      options: {
        sort: { name: 1 },
        limit: pagination.limit,
        skip: pagination.skip,
      },
    });
    return entities.map((entity) => this.factoryService.transform(entity));
  }

  async getAllTasksInProject(pagination: Pagination, projectId: string): Promise<Task[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.taskService.findMany({
      tenantId,
      find: {
        filter: {
          projectId: projectId,
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


  async searchTasks({
    input,
    pagination,
    projectId,
  }: {
    input: string;
    pagination: Pagination;
    projectId: string;
  }): Promise<Task[]> {
    const tenantId = 'your_tenant_id_here';


    const { limit, skip } = pagination;
    const entities = await this.dataServices.taskService.findMany({
      tenantId,
      find: {
        filter: {
          name: { $regex: input, $options: 'i' },
          projectId: projectId,
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

  async createTask(input: TaskInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newTask = {
      ...input,
      isDeleted: false,
    };

    const existingTask = await this.dataServices.taskService.findOne({
      tenantId,
      find: { filter: { name: newTask.name, isDeleted: false } },
    });

    if (existingTask) {
      return false;
    } else {
      const entity = await this.dataServices.taskService.create({ tenantId, item: newTask });
      return !!entity;
    }
  }

  async updateTask({
    input,

    id,
  }: {
    input: TaskInput;

    id: string;
  }): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const existingTask = await this.dataServices.taskService.findById({ tenantId, id });

    if (!existingTask) {
      throw new Exception(`Task with id ${id} not found`);
    }
    const updatedTask = {
      ...input,
    };
    const entity = await this.dataServices.taskService.updateOne({
      tenantId,
      id,
      update: { item: updatedTask },
    });
    return !!entity;
  }

  async deleteTasks(ids: string[], projectId: string): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.taskService.updateMany({
      tenantId,
      filter: { _id: { $in: ids }, projectId },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }

}
