import { ITenantGenericRepository } from '@passiontech-nestjs-template/zma-repositories';

import { MemberProjectEntity, ProjectEntity, TaskEntity } from '../../frameworks/data-services/mongo/entities';

export abstract class IDataServices {
  abstract projectService: ITenantGenericRepository<ProjectEntity>;
  abstract taskService: ITenantGenericRepository<TaskEntity>;
  abstract memberService: ITenantGenericRepository<MemberProjectEntity>;
}
