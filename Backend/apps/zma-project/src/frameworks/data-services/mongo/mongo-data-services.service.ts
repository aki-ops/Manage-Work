import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ITenantGenericRepository,
  TenantMongoGenericRepository,
} from '@passiontech-nestjs-template/zma-repositories';
import { Model } from 'mongoose';

import { IDataServices } from '../../../core';

import { ProjectDocument, ProjectEntity, MemberProjectDocument, MemberProjectEntity, TaskDocument, TaskEntity } from './entities';


@Injectable()
export class MongoDataServices implements IDataServices, OnApplicationBootstrap {
  projectService: ITenantGenericRepository<ProjectEntity>;
  memberService: ITenantGenericRepository<MemberProjectEntity>;
  taskService: ITenantGenericRepository<TaskEntity>;

  constructor(
    @InjectModel(ProjectEntity.name)
    private projectRepository: Model<ProjectDocument>,
    @InjectModel(MemberProjectEntity.name)
    private memberRepository: Model<MemberProjectDocument>,
    @InjectModel(TaskEntity.name)
    private taskRepository: Model<TaskDocument>,
  ) {}

  onApplicationBootstrap() {
    this.projectService = new TenantMongoGenericRepository(this.projectRepository);
    this.memberService = new TenantMongoGenericRepository(this.memberRepository);
    this.taskService = new TenantMongoGenericRepository(this.taskRepository);
  }
}
