import { ITenantGenericRepository } from '@passiontech-nestjs-template/zma-repositories';


import { ClassEntity } from '../../frameworks/data-services/mongo/entities/class.schema';
import { ClassStudentEntity } from '../../frameworks/data-services/mongo/entities/classStudent.schema';
import { DocumentEntity } from '../../frameworks/data-services/mongo/entities/document.schema';
import { NotiEntity } from '../../frameworks/data-services/mongo/entities/noti.schema';
import { ScoreEntity } from '../../frameworks/data-services/mongo/entities/score.schema';

export abstract class IDataServices {
  abstract classService: ITenantGenericRepository<ClassEntity>;
  abstract classStudentService: ITenantGenericRepository<ClassStudentEntity>;
  abstract documentService: ITenantGenericRepository<DocumentEntity>;
  abstract notiService: ITenantGenericRepository<NotiEntity>;
  abstract scoreService: ITenantGenericRepository<ScoreEntity>;
}
