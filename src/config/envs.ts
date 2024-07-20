import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  NATS_SERVER_URL: string;
  DATABASE_URL: string;
}
const envsSchema = joi
  .object({
    NATS_SERVER_URL: joi.string().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;
