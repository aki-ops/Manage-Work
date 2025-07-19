import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { ClassModel, ClassStudentModel, ScoreModel, NotiModel, DocumentModel } from '../../core/models';
import { ClassUseCase } from '../../use-cases/company/class.use-case';
import { DocumentUseCase } from '../../use-cases/company/document.use-case';
import { NotificationUseCase } from '../../use-cases/company/noti.use-case';
import { ScoreUseCase } from '../../use-cases/company/score.use-case';
import { ClassStudentUseCase } from '../../use-cases/company/studentadd.use-case';

@Resolver()
export class ClassResolver {
  constructor(private useCase: ClassUseCase, private classStudentUseCase: ClassStudentUseCase, private scoreUseCase: ScoreUseCase, private notificationUseCase: NotificationUseCase, private documentUseCase: DocumentUseCase) {}

  @Query(() => ClassModel)
  async class(@Args('id') id: string): Promise<ClassModel> {
    return this.useCase.getClass(id);
  }

  @Query(() => [ClassModel])
  async allClasses(@Args('pagination') pagination: Pagination): Promise<ClassModel[]> {
    return this.useCase.getAllClasses(pagination);
  }

  @Query(() => [ClassModel])
  async searchClasses(@Args('input') input: string, @Args('pagination') pagination: Pagination): Promise<ClassModel[]> {
    return this.useCase.searchClasses({ input, pagination });
  }

  @Query(() => [ClassStudentModel])
  async getAllStudentInClass(@Args('pagination') pagination: Pagination, @Args('classId') classId: string): Promise<ClassStudentModel[]> {
    return this.classStudentUseCase.getAllStudentInClass(pagination, classId);
  }

  @Query(() => [ClassStudentModel])
  async searchClasseshaveStudent(@Args('idStudent') idStudent: string, @Args('pagination') pagination: Pagination): Promise<ClassStudentModel[]> {
    return this.classStudentUseCase.searchClasseshaveStudent({ idStudent, pagination });
  }

  @Query(() => [ClassModel])
  async getAllClassesInTeacher(@Args('pagination') pagination: Pagination, @Args('teacherId') teacherId: string): Promise<ClassModel[]> {
    return this.useCase.getAllClassesInTeacher(pagination, teacherId);
  }

  @Query(() => [ScoreModel])
  async getAllScoreForStudent(@Args('pagination') pagination: Pagination, @Args('studentId') studentId: string): Promise<ScoreModel[]> {
    return this.scoreUseCase.getAllScoreForStudent(pagination, studentId);
  }

  @Query(() => [ScoreModel])
  async getAllScoreForClass(@Args('pagination') pagination: Pagination, @Args('classId') classId: string): Promise<ScoreModel[]> {
    return this.scoreUseCase.getAllScoreForClass(pagination, classId);
  }

  @Query(() => [NotiModel])
  async getAllNotification(@Args('pagination') pagination: Pagination, @Args('classId') classId: string): Promise<NotiModel[]> {
    return this.notificationUseCase.getAllNotification(pagination, classId);
  }

  @Query(() => [DocumentModel])
  async getAllDocument(@Args('pagination') pagination: Pagination, @Args('classId') classId: string): Promise<DocumentModel[]> {
    return this.documentUseCase.getAllDocumentInClass(pagination, classId);
  }

  @Query(() => [DocumentModel])
  async searchDocument(@Args('input') input: string, @Args('pagination') pagination: Pagination): Promise<DocumentModel[]> {
    return this.documentUseCase.searchDocument({ input, pagination });
  }
}