import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
import { REQUEST_USER_KEY } from "../constant/auth.constants";

/**
 * Custom NestJS decorator to access the authenticated user data from
 * the request. The `REQUEST_USER_KEY` is set in the
 * `AccessTokenGuard` when the user is authenticated.
 * @param field Optional field of the user data to return.
 * @returns The active user data or the user data with the
 * specified field if provided.
 */
export const ActiveUser = createParamDecorator((field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {

  const request = ctx.switchToHttp().getRequest();
  const user: ActiveUserData = request[REQUEST_USER_KEY];
  return field ? user?.[field] : user;

}) 