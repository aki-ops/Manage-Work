import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exception } from '@passiontech-nestjs-template/zma-middlewares';
import { Pagination } from '@passiontech-nestjs-template/zma-types';
import { firstValueFrom } from 'rxjs';

import { IDataServices } from '../../core/abstracts';
import { MemberInput } from '../../core/inputs';
import { Project } from '../../core/models';

import { MemberFactoryService } from './member-factory.use-case.service';


@Injectable()
export class MemberUseCase {
  constructor(
    @Inject('TEST_SERVICE') private client: ClientProxy,
    private dataServices: IDataServices,
    private factoryService: MemberFactoryService,
  ) {}

  async testMicroservice(): Promise<string> {
    const response = await firstValueFrom(
      this.client.send('sample', {
        body: {
          name: 'John Doe',
        },
      }),
    );

    return response;
  }

  async getMembersId(projectId: string): Promise<string[]> {
    const tenantId = 'your_tenant_id_here';

    const entities = await this.dataServices.memberService.findMany({
      tenantId,
      find: {
        filter: {
          projectId: projectId,
          isDeleted: false,
        },
      },
    });

    const memberIds = entities.map((entity) => entity.memberId);

    return memberIds;
  }

  async getProjects(
    memberId: string,
    pagination: Pagination,
  ): Promise<Project[]> {
    const tenantId = 'your_tenant_id_here';

    const { skip, limit } = pagination;
    const entities = await this.dataServices.memberService.findMany({
      tenantId,
      find: {
        filter: {
          memberId: memberId,
          isDeleted: false,
        },
      },
      options: {
        sort: { name: 1 },
        limit,
        skip,
      },
    });

    const projectIds = entities.map((entity) => entity.projectId);

    const projects = await this.dataServices.projectService.findMany({
      tenantId,
      find: {
        filter: {
          _id: { $in: projectIds },
          isDeleted: false,
        },
      },
      options: {
        sort: { name: 1 },
        limit,
        skip,
      },
    });
    return projects;
  }


  async addMemberToProject(input: MemberInput): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const newMember = {
      ...input,
      isDeleted: false,
    };

    const existingMember = await this.dataServices.memberService.findOne({
      tenantId,
      find: {
        filter: {
          memberId: newMember.memberId,
          projectId: newMember.projectId,
          isDeleted: false,
        },
      },
    });

    if (existingMember) {
      return false;
    } else {
      const entity = await this.dataServices.memberService.create({
        tenantId,
        item: newMember,
      });
      return !!entity;
    }
  }

  async updateRole({ input }: { input: MemberInput }): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';
    const existingMember = await this.dataServices.memberService.findOne({
      tenantId,
      find: {
        filter: {
          projectId: input.projectId,
          memberId: input.memberId,
          isDeleted: false,
        },
      },
    });

    if (!existingMember) {
      throw new Exception(`Member with id ${input.memberId} not found`);
    }
    const updatedMember = {
      ...input,
    };
    const entity = await this.dataServices.memberService.updateOne({
      tenantId,
      id: existingMember._id,
      update: {
        item: updatedMember,
      },
    });
    return !!entity;
  }

  async deleteMembers(ids: string[], projectId: string): Promise<boolean> {
    const tenantId = 'your_tenant_id_here';

    const { modifiedCount } = await this.dataServices.memberService.updateMany({
      tenantId,
      filter: { _id: { $in: ids }, projectId },
      item: { isDeleted: true },
    });
    return !!modifiedCount;
  }
}
