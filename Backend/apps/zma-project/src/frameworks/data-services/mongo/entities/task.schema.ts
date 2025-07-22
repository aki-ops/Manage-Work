import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IdUtils } from '@passiontech-nestjs-template/zma-utils';
import { Document, SchemaTypes } from 'mongoose';

import { PriorityEnum } from '../../../../core/types/enums/priority.enum';

export type TaskDocument = TaskEntity & Document;

@NestSchema({
  collection: 'tasks',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class TaskEntity {
  @Prop({ type: SchemaTypes.UUID, default: () => IdUtils.uuidv7() })
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: SchemaTypes.UUID, required: true })
  assigneeId: string;

  @Prop({ type: SchemaTypes.UUID, required: true })
  projectId: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ type: SchemaTypes.UUID, required: true })
  priority: PriorityEnum;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  tenantId?: string;

  @Prop({ default: false })
  isDeleted: boolean;

}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
