import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { MarkdownUtil } from '@passiontech-nestjs-template/zma-utils';

export const markdownMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  const value = await next();
  if (!value) {
    return value;
  }
  return MarkdownUtil.parse(value);
};
