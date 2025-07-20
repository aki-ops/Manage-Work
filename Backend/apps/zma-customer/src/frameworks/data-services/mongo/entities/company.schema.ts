import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IdUtils } from '@passiontech-nestjs-template/zma-utils';
import { Document, SchemaTypes } from 'mongoose';

export type CompanyDocument = CompanyEntity & Document;

@NestSchema({
  collection: 'companies',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class CompanyEntity {
  @Prop({ type: SchemaTypes.UUID, default: () => IdUtils.uuidv7() })
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  tenantId?: string;

  @Prop({ default: 0 })
  totalEmployees?: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
