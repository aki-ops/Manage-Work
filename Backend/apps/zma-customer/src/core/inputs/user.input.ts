import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UserInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  username: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  password: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  role: string;

}
