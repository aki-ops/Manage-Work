import { Schema as NestSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type ScoreDocument = ScoreEntity & Document;

@NestSchema({
  collection: 'score',
  toObject: {
    virtuals: true,
    versionKey: false,
  },
  timestamps: true,
})
export class ScoreEntity {
  @Prop()
  classId: string;

  @Prop()
  studentId: string;

  @Prop()
  score: number;

  @Prop()
  note?: string;

  @Prop()
  tenantId?: string;

  @Prop({ default: false })
  isDeleted: boolean;

}

export const ScoreSchema = SchemaFactory.createForClass(ScoreEntity);
