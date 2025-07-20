import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pagination } from '@passiontech-nestjs-template/zma-types';

import { User } from '../../core/models';
import { UserUseCase } from '../../use-cases/user/user.use-case';

@Resolver(() => User)
export class UserResolver {
  constructor(private useCase: UserUseCase) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.useCase.getUser(id);
  }

  @Query(() => [User])
  async users(@Args('ids', { type: () => [String] }) ids: string[]): Promise<User[]> {
    return this.useCase.getUsers({ ids });
  }

  @Query(() => [User])
  async allUsers(@Args('pagination') pagination: Pagination): Promise<User[]> {
    return this.useCase.getAllUsers(pagination);
  }

  @Query(() => [User])
  async searchUsers(
    @Args('input') input: string,
    @Args('pagination') pagination: Pagination,
  ): Promise<User[]> {
    return this.useCase.searchUsers({ input, pagination });
  }
}
