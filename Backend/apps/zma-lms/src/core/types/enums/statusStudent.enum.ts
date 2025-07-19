export enum ClassStudentStatus {
    Active = 'active',
    Paused = 'paused',
    Dropped = 'dropped',
  }
  
  import { registerEnumType } from '@nestjs/graphql';

  registerEnumType(ClassStudentStatus, {
    name: 'ClassStudentStatus',
    description: 'Trạng thái học sinh trong lớp',
  });