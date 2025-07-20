import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Company' })
export class Company {
  @Field(() => String, { name: 'id' })
  _id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  totalEmployees?: number;
}
