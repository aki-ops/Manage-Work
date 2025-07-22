import { Injectable } from '@nestjs/common';
import _ from 'lodash';

import { Project } from '../../core/models';
import { ProjectEntity } from '../../frameworks/data-services/mongo/entities';

@Injectable()
export class ProjectFactoryService {
  transform(entity: ProjectEntity): Project {
    const project: Project = _.assign(entity);
    return project;
  }
}
