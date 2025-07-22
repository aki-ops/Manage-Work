import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IdUtils } from '@passiontech-nestjs-template/zma-utils';
import { Document, SchemaTypes } from 'mongoose';

export type ProjectDocument = ProjectEntity & Document;

@NestSchema({
  collection: 'projects',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class ProjectEntity {
  @Prop({ type: SchemaTypes.UUID, default: () => IdUtils.uuidv7() })
  _id?: string;

  @Prop()
  name?: string;

  @Prop({ required: true })
  description?: string;

  @Prop({ type: SchemaTypes.UUID, required: true })
  ownerId: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop()
  tenantId?: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);
