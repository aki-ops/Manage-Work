import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import { PriorityEnum } from '../types';

@InputType()
export class TaskInput {
  @IsString()
  @Field()
  assigneeId: string;

  @IsString()
  @Field()
  projectId: string;

  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @Field()
  status: string;

  @Field(() => PriorityEnum)
  priority: PriorityEnum;

  @Field()
  createdAt: Date;

}
