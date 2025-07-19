

import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class NotificationInput {
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    classId: string;
    
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    senderId: string;
    
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    content: string;
    
    @IsOptional()
    @Field({ nullable: true })
    date: Date;

}
