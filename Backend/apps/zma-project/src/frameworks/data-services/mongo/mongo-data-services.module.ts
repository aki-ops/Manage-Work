import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IDataServices } from '../../../core';

import { TaskEntity, TaskSchema, ProjectEntity, ProjectSchema, MemberProjectEntity, MemberProjectSchema  } from './entities';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProjectEntity.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: TaskEntity.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: MemberProjectEntity.name, schema: MemberProjectSchema }]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
