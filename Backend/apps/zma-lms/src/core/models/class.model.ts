import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Class' })
export class ClassModel {
  @Field(() => String, { name: 'id' })
  _id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  teacherId?: string;

  @Field({ nullable: true })
  schedule?: string;

  @Field({ nullable: true })
  room?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => Number, { nullable: true })
  expectedStudentCount?: number;

  @Field(() => Number, { nullable: true })
  actualStudentCount?: number;

  @Field(() => String, { nullable: true })
  status?: 'ongoing' | 'completed' | 'cancelled';
}
