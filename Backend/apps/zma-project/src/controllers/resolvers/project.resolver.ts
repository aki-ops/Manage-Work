import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { Project } from '../../core/models';
import { ProjectUseCase } from '../../use-cases/project/project.use-case';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private useCase: ProjectUseCase) {}

  @Query(() => Project)
  async project(@Args('id') id: string): Promise<Project> {
    return this.useCase.getProject(id);
  }

  @Query(() => [Project])
  async projects(@Args('ids', { type: () => [String] }) ids: string[]): Promise<Project[]> {
    return this.useCase.getProjects({ ids });
  }

  @Query(() => [Project])
  async allProjects(@Args('pagination') pagination: Pagination): Promise<Project[]> {
    return this.useCase.getAllProject(pagination);
  }

  @Query(() => [Project])
  async searchProjects(
    @Args('input') input: string,
    @Args('pagination') pagination: Pagination,
  ): Promise<Project[]> {
    return this.useCase.searchProjects({ input, pagination });
  }

}
