import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotiDocument = NotiEntity & Document;

@NestSchema({
  collection: 'noti',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class NotiEntity {
  @Prop()
  classId: string;

  @Prop()
  senderId: string;

  @Prop()
  tenantId?: string;

  @Prop()
  content: string;

  @Prop()
  date: Date;


  @Prop({ default: false })
  isDeleted: boolean;

}

export const NotiSchema = SchemaFactory.createForClass(NotiEntity);
