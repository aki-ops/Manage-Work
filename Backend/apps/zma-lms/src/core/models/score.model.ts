import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Score' })
export class ScoreModel {
  @Field()
  classId: string;

  @Field()
  studentId: string;

  @Field()
  score: number;

  @Field()
  note?: string;
}
