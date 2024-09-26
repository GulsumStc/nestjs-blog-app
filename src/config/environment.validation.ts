import * as Joi from "joi";

export default Joi.object({

  NODE_ENV: Joi
    .string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  
  DATABASE_PORT: Joi
    .number()
    .port()
    .default(5432),
  
  DATABASE_SYNCHRONIZE: Joi
    .boolean()
    .default(true),
  
  DATABASE_AUTOLOADENTITIES: Joi
    .boolean()
    .default(true),
  
  DATABASE_NAME: Joi
    .string()
    .required(),
  
  DATABASE_USER: Joi
    .string()
    .required(),
  
  DATABASE_PASSWORD: Joi
    .string()
    .required(),
  
  DATABASE_HOST: Joi
    .string()
    .default('localhost'),
  
  PROFILE_API_KEY: Joi
    .string()
    .required(),
  
  /* jwt env variables */

  JWT_SECRET: Joi
    .string()
    .required(),

  JWT_TOKEN_AUDIENCE: Joi
    .string()
    .required(),

  JWT_TOKEN_ISSUER: Joi
    .string()
    .required(),

  JWT_ACCESS_TOKEN_TTL: Joi
    .number()
    .required(),
  
  JWT_REFRESH_TOKEN_TTL: Joi
    .number()
    .required(),
  
  API_VERSION: Joi
    .string()
  
  
})