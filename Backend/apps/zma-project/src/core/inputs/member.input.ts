import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { ProjectRoleEnum } from '../types';

@InputType()
export class MemberInput {

  @IsString()
  @Field()
  projectId: string;

  @IsString()
  @Field()
  memberId: string;

  @IsArray()
  @IsOptional()
  @Field(() => [ProjectRoleEnum], { nullable: true })
  role?: ProjectRoleEnum[];
}
