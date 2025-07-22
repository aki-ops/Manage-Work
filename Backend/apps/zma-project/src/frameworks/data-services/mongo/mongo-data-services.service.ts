import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IGenericRepository,
  TenantMongoGenericRepository,
} from '@passiontech-nestjs-template/zma-repositories';
import { Model } from 'mongoose';

import { IDataServices } from '../../../core';

import { CompanyDocument, CompanyEntity, UserDocument, UserEntity } from './entities';

@Injectable()
export class MongoDataServices implements IDataServices, OnApplicationBootstrap {
  companyService: IGenericRepository<CompanyEntity>;
  userService: IGenericRepository<UserEntity>;

  constructor(
    @InjectModel(CompanyEntity.name)
    private companyRepository: Model<CompanyDocument>,
    @InjectModel(UserEntity.name)
    private userRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.companyService = new TenantMongoGenericRepository(this.companyRepository);
    this.userService = new TenantMongoGenericRepository(this.userRepository);
  }
}
