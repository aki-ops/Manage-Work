import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

import { ClassStudentStatus } from '../../../../core/types/enums';


export type ClassStudentDocument = ClassStudentEntity & Document;

@NestSchema({
  collection: 'classStudent',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class ClassStudentEntity {

  @Prop()
  tenantId?: string;

  @Prop()
  classId: string;

  @Prop()
  studentId: string;

  @Prop({ type: String, enum: ClassStudentStatus, default: ClassStudentStatus.Active })
  status?: ClassStudentStatus;

  @Prop({ default: false })
  isDeleted: boolean;

}

export const ClassStudentSchema = SchemaFactory.createForClass(ClassStudentEntity);
