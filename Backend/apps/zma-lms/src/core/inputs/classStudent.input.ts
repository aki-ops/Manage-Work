import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class ClassStudentInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  classId: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  studentId: string;

}
