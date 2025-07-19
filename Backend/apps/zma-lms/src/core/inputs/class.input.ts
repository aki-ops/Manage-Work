import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class ClassInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  teacherId?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  schedule?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  room?: string;

  @IsOptional()
  @Field({ nullable: true })
  startDate?: Date;

  @IsOptional()
  @Field({ nullable: true })
  endDate?: Date;

  @IsOptional()
  @IsInt()
  @Field()
  expectedStudentCount?: number;

  @IsOptional()
  @IsInt()
  @Field()
  actualStudentCount?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { defaultValue: 'ongoing' })
  status?: 'ongoing' | 'completed' | 'cancelled';
}
