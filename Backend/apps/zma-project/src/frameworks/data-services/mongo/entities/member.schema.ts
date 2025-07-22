import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IdUtils } from '@passiontech-nestjs-template/zma-utils';
import { ProjectRoleEnum } from 'apps/zma-project/src/core/types';
import { Document, SchemaTypes } from 'mongoose';

export type MemberProjectDocument = MemberProjectEntity & Document;

@NestSchema({
  collection: 'memberProjects',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class MemberProjectEntity {
  @Prop({ type: SchemaTypes.UUID, default: () => IdUtils.uuidv7() })
  _id?: string;

  @Prop({ type: SchemaTypes.UUID, required: true })
  memberId: string;

  @Prop({ type: SchemaTypes.UUID, required: true })
  projectId: string;

  @Prop()
  tenantId?: string;

  @Prop({ type: [String], enum: ProjectRoleEnum, default: [] })
  role?: ProjectRoleEnum[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const MemberProjectSchema =
  SchemaFactory.createForClass(MemberProjectEntity);
