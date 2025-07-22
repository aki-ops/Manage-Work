import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { Task } from '../../core/models';
import { TaskUseCase } from '../../use-cases/task/task.use-case';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private useCase: TaskUseCase) {}

  @Query(() => Task)
  async getTask(@Args('ProjectId') id: string, @Args('taskId') taskId: string): Promise<Task> {
    return this.useCase.getTask(id, taskId);
  }

  @Query(() => [Task])
  async getTasks(
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('projectId') projectId: string,
    @Args('pagination') pagination: Pagination,
  ): Promise<Task[]> {
    return this.useCase.getTasks({ ids }, projectId, pagination);
  }

}