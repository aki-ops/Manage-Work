import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserInput } from '../../core/inputs';
import { UserUseCase } from '../../use-cases/user/user.use-case';

@Resolver()
export class UserMutation {
  constructor(private useCase: UserUseCase) {}
  private readonly logger = new Logger(UserMutation.name);

  @Mutation(() => Boolean)
  async createUser(
    @Args('input', { type: () => UserInput }) input: UserInput,
  ): Promise<boolean> {
    return this.useCase.createUser(input);
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Args('input', { type: () => UserInput }) input: UserInput,
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.useCase.updateUser({ input, id });
  }

  @Mutation(() => Boolean)
  async deleteUsers(@Args('ids', { type: () => [String] }) ids: string[]): Promise<boolean> {
    return this.useCase.deleteUsers(ids);
  }

}
