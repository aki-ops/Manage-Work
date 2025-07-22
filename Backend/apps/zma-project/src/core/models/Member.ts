import { Field, ObjectType } from '@nestjs/graphql';

import { ProjectRoleEnum } from '../types/enums/projectRole.enum';


@ObjectType({ description: 'Member-Project' })
export class Member {

  @Field(() => String, { name: 'id' })
  _id?: string;

  @Field()
  projectId: string;

  @Field()
  memberId: string;

  @Field(() => [ProjectRoleEnum], { nullable: true })
  role?: ProjectRoleEnum[];
}
