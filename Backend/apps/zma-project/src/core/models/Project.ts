import { Field, ObjectType } from '@nestjs/graphql';
import { required } from 'joi';

@ObjectType({ description: 'Project' })
export class Project {
  @Field(() => String, { name: 'id' })
  _id?: string;

  @Field()
  ownerId: string;

  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field(() => Date)
  createdAt?: Date;
}
