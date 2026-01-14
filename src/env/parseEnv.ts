import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const DEFAULT_ENV = 'dev';
const ALLOWED_ENVS = new Set(['dev', 'stg']);

const resolveEnvFile = (envName: string): string => {
  if (!ALLOWED_ENVS.has(envName)) {
    throw new Error(`ENV must be one of: ${Array.from(ALLOWED_ENVS).join(', ')}`);
  }

  const envDir = path.resolve(__dirname, '../../env');
  const filePath = path.join(envDir, `${envName}.env`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Env file not found: ${envName}.env`);
  }

  return filePath;
};

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

export type EnvConfig = {
  envName: string;
  uiBaseUrl: string;
  apiBaseUrl: string;
  headless: boolean;
  timeout: number;
};

export const parseEnv = (): EnvConfig => {
  const envName = process.env.ENV || DEFAULT_ENV;

  dotenv.config({ path: path.resolve(__dirname, '../../env/common.env') });
  dotenv.config({ path: resolveEnvFile(envName), override: true });

  const uiBaseUrl = process.env.UI_BASE_URL || 'https://example.com';
  const apiBaseUrl = process.env.API_BASE_URL || 'https://reqres.in/api';
  const headless = parseBoolean(process.env.HEADLESS, true);
  const timeout = Number(process.env.TIMEOUT || 30000);

  if (Number.isNaN(timeout)) {
    throw new Error('TIMEOUT must be a number');
  }

  return {
    envName,
    uiBaseUrl,
    apiBaseUrl,
    headless,
    timeout,
  };
};
