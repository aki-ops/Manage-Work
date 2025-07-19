import { IGenericRepository } from '@passiontech-nestjs-template/zma-repositories';

import { FileEntity } from '../../frameworks/data-services/mongo/entities';

export abstract class IDataServices {
  abstract fileService: IGenericRepository<FileEntity>;
}
