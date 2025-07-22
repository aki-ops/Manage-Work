import { Field, ObjectType } from '@nestjs/graphql';

import { PriorityEnum } from '../types/enums/priority.enum';

@ObjectType({ description: 'Task' })
export class Task {
  @Field(() => String, { name: 'id' })
  _id?: string;

  @Field()
  assigneeId: string;

  @Field()
  projectId: string;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  status: string;

  @Field(() => PriorityEnum)
  priority: PriorityEnum;

}
