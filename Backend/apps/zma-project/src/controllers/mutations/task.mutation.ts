import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { TaskInput } from '../../core/inputs';
import { TaskUseCase } from '../../use-cases/task/task.use-case';

@Resolver()
export class TaskMutation {
  constructor(private useCase: TaskUseCase) {}
  private readonly logger = new Logger(TaskMutation.name);

  @Mutation(() => Boolean)
  async createTask(
    @Args('input', { type: () => TaskInput }) input: TaskInput,
  ): Promise<boolean> {
    return this.useCase.createTask(input);
  }

  @Mutation(() => Boolean)
  async updateTask(
    @Args('input', { type: () => TaskInput }) input: TaskInput,
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.useCase.updateTask({ input , id });
  }

  @Mutation(() => Boolean)
  async removeTask(
    @Args('id') ids: string[],
    @Args('projectId') projectId: string,
  ): Promise<boolean> {
    return this.useCase.deleteTasks(ids, projectId);
  }

}
