import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field(() => String, { name: 'id' })
  _id?: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: string;

}
