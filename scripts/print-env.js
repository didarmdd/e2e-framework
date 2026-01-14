const path = require('path');
const dotenv = require('dotenv');

const DEFAULT_ENV = 'dev';
const ALLOWED_ENVS = new Set(['dev', 'stg']);

const envName = process.env.ENV || DEFAULT_ENV;
if (!ALLOWED_ENVS.has(envName)) {
  throw new Error(`ENV must be one of: ${Array.from(ALLOWED_ENVS).join(', ')}`);
}

dotenv.config({ path: path.resolve(__dirname, '../env/common.env') });
dotenv.config({
  path: path.resolve(__dirname, `../env/${envName}.env`),
  override: true,
});

const output = {
  ENV: envName,
  UI_BASE_URL: process.env.UI_BASE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
  HEADLESS: process.env.HEADLESS,
  TIMEOUT: process.env.TIMEOUT,
};

console.log(JSON.stringify(output, null, 2));
