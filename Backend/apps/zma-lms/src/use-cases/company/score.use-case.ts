import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { IDataServices } from '../../core/abstracts';
import { ScoreInput } from '../../core/inputs';
import { ScoreModel} from '../../core/models';



import { ScoreFactoryService } from './class-factory.user-case.service';



@Injectable()
export class ScoreUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: ScoreFactoryService,
  ) {}


  async getAllScoreForStudent(pagination: Pagination, studentId: string): Promise<ScoreModel[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.scoreService.findMany({
      tenantId,
      find: {
        filter: {
          studentId: studentId,
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

  async getAllScoreForClass(pagination: Pagination, classId: string): Promise<ScoreModel[]> {
    const tenantId = 'your_tenant_id_here';
    const { skip, limit } = pagination;
    const entities = await this.dataServices.scoreService.findMany({
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


  async createScore(input: ScoreInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newScore = {
      ...input,
      isDeleted: false
    };

    const existingScore = await this.dataServices.scoreService.findOne({
      tenantId,
      find: { filter: { studentId: newScore.studentId, classId: newScore.classId, isDeleted: false } },
    });

    if (existingScore) {
      return false;
    } else {
      const entity = await this.dataServices.scoreService.create({tenantId, item: newScore});
      return !!entity;
    }
  }

  async updateScore({
    input,
    classId,
    studentId,
  }: {
    input: ScoreInput;
    classId: string;
    studentId: string;
  }): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const existingScore = await this.dataServices.scoreService.findOne({ tenantId, find: { filter: { studentId: studentId, classId: classId, isDeleted: false } } });

    if (!existingScore) {
      throw new Exception(`Score with studentId ${studentId} and classId ${classId} not found`);
    }
    const updatedScore = {
      ...input,
    };
    const entity = await this.dataServices.scoreService.updateMany({
      tenantId,
      filter: { studentId: studentId, classId: classId, isDeleted: false },
      item: { ...updatedScore },
    });
    return !!entity;
  }

  async deleteScore(classId: string, studentId: string): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const { modifiedCount } = await this.dataServices.scoreService.updateMany({
      tenantId,
      filter: { classId: classId, studentId: studentId, isDeleted: false },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }
}

