import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ProjectInput } from '../../core/inputs';
import { ProjectUseCase } from '../../use-cases/project/project.use-case';

@Resolver()
export class ProjectMutation {
  constructor(private useCase: ProjectUseCase) {}
  private readonly logger = new Logger(ProjectMutation.name);

  @Mutation(() => Boolean)
  async createProject(
    @Args('input', { type: () => ProjectInput }) input: ProjectInput,
  ): Promise<boolean> {
    return this.useCase.createProject(input);
  }

  @Mutation(() => Boolean)
  async updateProject(
    @Args('input', { type: () => ProjectInput }) input: ProjectInput,
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.useCase.updateProject({ input, id });
  }

  @Mutation(() => Boolean)
  async deleteProjects(@Args('ids', { type: () => [String] }) ids: string[]): Promise<boolean> {
    return this.useCase.deleteProjects(ids);
  }

}
