import { Injectable } from '@nestjs/common';
import _ from 'lodash';

import { Task } from '../../core/models';
import { TaskEntity } from '../../frameworks/data-services/mongo/entities';

@Injectable()
export class TaskFactoryService {
  transform(entity: TaskEntity): Task {
    const task: Task = _.assign(entity);
    return task;
  }
}

