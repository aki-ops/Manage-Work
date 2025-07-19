import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ClassInput, ClassStudentInput, DocumentInput, NotificationInput, ScoreInput } from '../../core/inputs';
import { ClassStudentStatus } from '../../core/types/enums';
import { ClassUseCase } from '../../use-cases/company/class.use-case';
import { DocumentUseCase } from '../../use-cases/company/document.use-case';
import { NotificationUseCase } from '../../use-cases/company/noti.use-case';
import { ScoreUseCase } from '../../use-cases/company/score.use-case';
import { ClassStudentUseCase } from '../../use-cases/company/studentadd.use-case';

@Resolver()
export class ClassMutation {
  constructor(private useCase: ClassUseCase, private classStudentUseCase: ClassStudentUseCase, private scoreUseCase: ScoreUseCase, private notificationUseCase: NotificationUseCase, private documentUseCase: DocumentUseCase) {}
  private readonly logger = new Logger(ClassMutation.name);

  @Mutation(() => Boolean)
  async createClass(
    @Args('input', { type: () => ClassInput }) input: ClassInput,
  ): Promise<boolean> {
    return this.useCase.createClass(input);
  }

  @Mutation(() => Boolean)
  async updateClass(
    @Args('input', { type: () => ClassInput }) input: ClassInput,
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.useCase.updateClass({ input, id });
  }

  @Mutation(() => Boolean)
  async deleteClass(@Args('ids', { type: () => [String] }) ids: string[]): Promise<boolean> {
    return this.useCase.deleteClass(ids);
  }

  @Mutation(() => Boolean)
  async addStudentToClass(
    @Args('input', { type: () => ClassStudentInput }) input: ClassStudentInput,
  ): Promise<boolean> {
    return this.classStudentUseCase.addStudentToClass(input);
  }

  @Mutation(() => Boolean)
  async changeStatusStudent(
    @Args('classId') classId: string,
    @Args('studentId') studentId: string,
    @Args('status', { type: () => ClassStudentStatus }) status: ClassStudentStatus,
  ): Promise<boolean> {
    return this.classStudentUseCase.changeStatusStudent({ classId, studentId, status });
  }

  @Mutation(() => Boolean)
  async deleteStudentFromClass(
    @Args('classId') classId: string,
    @Args('studentId') studentId: string,
  ): Promise<boolean> {
    return this.classStudentUseCase.deleteStudentFromClass(classId, studentId);
  }

  @Mutation(() => Boolean)
  async createScore(
    @Args('input', { type: () => ScoreInput }) input: ScoreInput,
  ): Promise<boolean> {
    return this.scoreUseCase.createScore(input);
  }

  @Mutation(() => Boolean)
  async updateScore(
    @Args('input', { type: () => ScoreInput }) input: ScoreInput,
    @Args('classId') classId: string,
    @Args('studentId') studentId: string,
  ): Promise<boolean> {
    return this.scoreUseCase.updateScore({ input, classId, studentId });
  }

  @Mutation(() => Boolean)
  async deleteScore(
    @Args('classId') classId: string,
    @Args('studentId') studentId: string,
  ): Promise<boolean> {
    return this.scoreUseCase.deleteScore(classId, studentId);
  }

  @Mutation(() => Boolean)
  async createNotification(
    @Args('input', { type: () => NotificationInput }) input: NotificationInput,
  ): Promise<boolean> {
    return this.notificationUseCase.createNotification(input);
  }

  @Mutation(() => Boolean)
  async createDocument(
    @Args('input', { type: () => DocumentInput }) input: DocumentInput,
  ): Promise<boolean> {
    return this.documentUseCase.addDocumentToClass(input);
  }

  @Mutation(() => Boolean)
  async deleteDocument(
    @Args('documentId') documentId: string,
  ): Promise<boolean> {
    return this.documentUseCase.deleteDocumentFromClass(documentId);
  }


}

