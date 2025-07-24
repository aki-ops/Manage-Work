import { registerEnumType } from "@nestjs/graphql"

export enum PriorityEnum {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

registerEnumType(PriorityEnum, {
  name: 'PriovityEnum', // 👈 tên dùng trong GraphQL schema
})