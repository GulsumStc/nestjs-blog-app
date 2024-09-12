import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../enums/auth-type.enum";
import { AUTH_TYPE_KEY } from "../constant/auth.constants";

/**
 * Custom decorator for specifying that  authentication is required or not.
 * This decorator takes an array of authentication types (e.g., Bearer, None)
 *
 * @param  authTypes - An array of authentication types 
 */
export const Auth = (...authTypes: AuthType[]) => {
  /**
   * Sets metadata with the key "AUTH_TYPE_KEY" and the value being the array of
   * authentication types passed to the decorator.
   */
  SetMetadata(AUTH_TYPE_KEY, authTypes);
};


