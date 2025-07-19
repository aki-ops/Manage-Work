import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IGenericRepository,
  TenantMongoGenericRepository,
} from '@passiontech-nestjs-template/zma-repositories';
import { Model } from 'mongoose';

import { IDataServices } from '../../../core';

import { ClassDocument, ClassEntity, ClassStudentDocument, ClassStudentEntity, NotiDocument, NotiEntity, ScoreDocument, ScoreEntity, DocumentDocument, DocumentEntity } from './entities';

@Injectable()
export class MongoDataServices implements IDataServices, OnApplicationBootstrap {
  classService: IGenericRepository<ClassEntity>;
  classStudentService: IGenericRepository<ClassStudentEntity>;
  notiService: IGenericRepository<NotiEntity>;
  scoreService: IGenericRepository<ScoreEntity>;
  documentService: IGenericRepository<DocumentEntity>;

  constructor(
    @InjectModel(ClassEntity.name)
    private classRepository: Model<ClassDocument>,
    @InjectModel(ClassStudentEntity.name)
    private classStudentRepository: Model<ClassStudentDocument>,
    @InjectModel(NotiEntity.name)
    private notiRepository: Model<NotiDocument>,
    @InjectModel(ScoreEntity.name)
    private scoreRepository: Model<ScoreDocument>,
    @InjectModel(DocumentEntity.name)
    private documentRepository: Model<DocumentDocument>,
  ) {}

  onApplicationBootstrap() {
    this.classService = new TenantMongoGenericRepository(this.classRepository);
    this.classStudentService = new TenantMongoGenericRepository(this.classStudentRepository);
    this.notiService = new TenantMongoGenericRepository(this.notiRepository);
    this.scoreService = new TenantMongoGenericRepository(this.scoreRepository);
    this.documentService = new TenantMongoGenericRepository(this.documentRepository);
  }
}
