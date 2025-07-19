import { Injectable } from '@nestjs/common';
import _ from 'lodash';

import { ClassModel, ClassStudentModel, DocumentModel, ScoreModel, NotiModel } from '../../core/models';
import { ClassEntity, ClassStudentEntity, DocumentEntity, ScoreEntity, NotiEntity } from '../../frameworks/data-services/mongo/entities';

@Injectable()
export class ClassFactoryService {
  transform(entity: ClassEntity): ClassModel {
    const classModel: ClassModel = _.assign(entity);
    return classModel;
  }
}

@Injectable()
export class ClassStudentFactoryService {
  transform(entity: ClassStudentEntity): ClassStudentModel {
    const classStudentModel: ClassStudentModel = _.assign(entity);
    return classStudentModel;
  }
}

@Injectable()
export class DocumentFactoryService {
  transform(entity: DocumentEntity): DocumentModel {
    const documentModel: DocumentModel = _.assign(entity);
    return documentModel;
  }
}

@Injectable()
export class ScoreFactoryService {
  transform(entity: ScoreEntity): ScoreModel {
    const scoreModel: ScoreModel = _.assign(entity);
    return scoreModel;
  }
}

@Injectable()
export class NotificationFactoryService {
  transform(entity: NotiEntity): NotiModel {
    const notiModel: NotiModel = _.assign(entity);
    return notiModel;
  }
}

