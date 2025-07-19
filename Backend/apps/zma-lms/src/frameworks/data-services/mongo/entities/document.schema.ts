import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IdUtils } from '@passiontech-nestjs-template/zma-utils';
import { Document, SchemaTypes } from 'mongoose';

export type DocumentDocument = DocumentEntity & Document;

@NestSchema({
  collection: 'document',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class DocumentEntity {
  @Prop({ type: SchemaTypes.UUID, default: () => IdUtils.uuidv7() })
  _id?: string;

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

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
