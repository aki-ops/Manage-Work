import { Injectable } from '@nestjs/common';
import _ from 'lodash';

import { Member } from '../../core/models';
import { MemberProjectEntity } from '../../frameworks/data-services/mongo/entities';

@Injectable()
export class MemberFactoryService {
  transform(entity: MemberProjectEntity): Member {
    const member: Member = _.assign(entity);
    return member;
  }
}

