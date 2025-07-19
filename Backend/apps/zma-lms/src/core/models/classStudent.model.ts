import { Field, ObjectType } from '@nestjs/graphql';

import { ClassStudentStatus } from '../types/enums';

@ObjectType({ description: 'ClassStudent' })
export class ClassStudentModel {
  @Field()
  classId: string;

  @Field()
  studentId: string;

  @Field(() => String, { defaultValue: ClassStudentStatus.Active })
  status?: ClassStudentStatus;
}
