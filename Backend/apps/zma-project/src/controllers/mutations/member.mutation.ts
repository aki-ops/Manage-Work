import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { MemberInput } from '../../core/inputs';
import { MemberUseCase } from '../../use-cases/member/member.use-case';

@Resolver()
export class MemberMutation {
  constructor(private useCase: MemberUseCase) {}
  private readonly logger = new Logger(MemberMutation.name);

  @Mutation(() => Boolean)
  async createMember(
    @Args('input', { type: () => MemberInput }) input: MemberInput,
  ): Promise<boolean> {
    return this.useCase.addMemberToProject(input);
  }

  @Mutation(() => Boolean)
  async updateRole(
    @Args('input', { type: () => MemberInput }) input: MemberInput,
  ): Promise<boolean> {
    return this.useCase.updateRole({ input });
  }

  @Mutation(() => Boolean)
  async removeMember(
    @Args('id') ids: string[],
    @Args('projectId') projectId: string,
  ): Promise<boolean> {
    return this.useCase.deleteMembers(ids, projectId);
  }
}
