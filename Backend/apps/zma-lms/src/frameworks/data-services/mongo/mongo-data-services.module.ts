import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IDataServices } from '../../../core';

import { ClassEntity, ClassSchema, ClassStudentEntity, ClassStudentSchema, NotiEntity, NotiSchema, ScoreEntity, ScoreSchema, DocumentEntity, DocumentSchema } from './entities';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassEntity.name, schema: ClassSchema },
      { name: ClassStudentEntity.name, schema: ClassStudentSchema },
      { name: NotiEntity.name, schema: NotiSchema },
      { name: ScoreEntity.name, schema: ScoreSchema },
      { name: DocumentEntity.name, schema: DocumentSchema },
    ]),
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
