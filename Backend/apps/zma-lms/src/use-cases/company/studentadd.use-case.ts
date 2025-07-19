import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { IDataServices } from '../../core/abstracts';
import { ClassStudentInput } from '../../core/inputs';
import { ClassStudentModel } from '../../core/models';
import { ClassStudentStatus } from '../../core/types/enums';


import { ClassStudentFactoryService } from './class-factory.user-case.service';



@Injectable()
export class ClassStudentUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: ClassStudentFactoryService,
  ) {}


  async getAllStudentInClass(pagination: Pagination, classId: string): Promise<ClassStudentModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;

    const entities = await this.dataServices.classStudentService.findMany({
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


  async searchClasseshaveStudent({
    idStudent,
    pagination,
  }: {
    idStudent: string;
    pagination: Pagination;
  }): Promise<ClassStudentModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { limit, skip } = pagination;
    const entities = await this.dataServices.classStudentService.findMany({
      tenantId,
      find: {
        filter: {
          studentId : idStudent,
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

  async addStudentToClass(input: ClassStudentInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newStudentClass = {
      ...input,
      isDeleted: false,
      status: ClassStudentStatus.Active,
    };

    const existingStudentClass = await this.dataServices.classStudentService.findOne({
      tenantId,
      find: { filter: { classId: newStudentClass.classId, studentId: newStudentClass.studentId, isDeleted: false } },
    });

    if (existingStudentClass) {
      return false;
    } else {
      const entity = await this.dataServices.classStudentService.create({tenantId, item: newStudentClass});
      return !!entity;
    }
  }

  async changeStatusStudent({
    classId,
    studentId,
    status,
  }: {
    classId: string;
    studentId: string;
    status: ClassStudentStatus;

  }): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const existingStudentClass = await this.dataServices.classStudentService.findMany({
      tenantId,
      find: {
        filter: {
          studentId : studentId,
          classId: classId,
          isDeleted: false,
        },
      },
    });

    if (!existingStudentClass) {
      throw new Exception(`Student with id ${studentId} not found in class ${classId}`);
    }
    const entity = await this.dataServices.classStudentService.updateMany({
      tenantId,
      filter: {
        studentId : studentId,
        classId: classId,
        isDeleted: false,
      },
      item: { status: status },
    });
    return !!entity;
  }

  async deleteStudentFromClass(classId: string, studentId: string): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.classStudentService.updateMany({
      tenantId,
      filter: { classId: classId, studentId: studentId, isDeleted: false },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }

}