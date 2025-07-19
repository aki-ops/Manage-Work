import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Notification' })
export class NotiModel {
  @Field(() => String, { name: 'id' })
  _id?: string;
  
  @Field()
  classId: string;

  @Field()
  senderId: string;

  @Field()
  content: string;

  @Field()
  date: Date;
}
