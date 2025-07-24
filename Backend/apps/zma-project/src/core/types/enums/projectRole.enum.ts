import { registerEnumType } from "@nestjs/graphql"

export enum ProjectRoleEnum {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}



registerEnumType(ProjectRoleEnum, {
  name: 'ProjectRole', // 👈 tên dùng trong GraphQL schema
})