import { ITenantGenericRepository } from '@passiontech-nestjs-template/zma-repositories';

import { CompanyEntity, UserEntity } from '../../frameworks/data-services/mongo/entities';

export abstract class IDataServices {
  abstract companyService: ITenantGenericRepository<CompanyEntity>;
  abstract userService: ITenantGenericRepository<UserEntity>;
}
