import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class ScoreInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  classId: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  studentId: string;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  score: number;

}
