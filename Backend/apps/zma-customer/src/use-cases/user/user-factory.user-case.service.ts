import { Injectable } from '@nestjs/common';
import _ from 'lodash';

import { User } from '../../core/models';
import { UserEntity } from '../../frameworks/data-services/mongo/entities';

@Injectable()
export class UserFactoryService {
  transform(entity: UserEntity): User {
    const user: User = _.assign(entity);
    return user;
  }
}

