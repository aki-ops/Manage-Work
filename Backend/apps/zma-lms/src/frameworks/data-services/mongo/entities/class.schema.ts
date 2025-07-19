import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IdUtils } from '@passiontech-nestjs-template/zma-utils';
import { Document, SchemaTypes } from 'mongoose';

export type ClassDocument = ClassEntity & Document;

@NestSchema({
  collection: 'class',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class ClassEntity {
  @Prop({ type: SchemaTypes.UUID, default: () => IdUtils.uuidv7() })
  _id?: string;

  @Prop()
  name: string;

  @Prop()
  teacherId?: string;

  @Prop()
  schedule?: string;

  @Prop()
  room?: string;

  @Prop()
  tenantId?: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop()
  expectedStudentCount?: number;

  @Prop()
  actualStudentCount?: number;

  @Prop({ nullable: true })
  status?: 'ongoing' | 'completed' | 'cancelled';

  @Prop({ default: false })
  isDeleted: boolean;

}

export const ClassSchema = SchemaFactory.createForClass(ClassEntity);
