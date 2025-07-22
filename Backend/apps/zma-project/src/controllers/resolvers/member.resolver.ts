import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { Member, Project } from '../../core/models';
import { MemberUseCase } from '../../use-cases/member/member.use-case';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private useCase: MemberUseCase) {}

  @Query(() => [String])
  async getMembersId(@Args('ProjectId') id: string): Promise<string[]> {
    return this.useCase.getMembersId(id);
  }

  @Query(() => [Project])
  async getProjects(
    @Args('memberId') memberId: string,
    @Args('pagination') pagination: Pagination,
  ): Promise<Project[]> {
    return this.useCase.getProjects(memberId, pagination);
  }

}