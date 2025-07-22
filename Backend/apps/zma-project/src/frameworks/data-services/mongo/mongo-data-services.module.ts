import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IDataServices } from '../../../core';

import { CompanyEntity, CompanySchema, UserEntity, UserSchema } from './entities';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CompanyEntity.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
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
