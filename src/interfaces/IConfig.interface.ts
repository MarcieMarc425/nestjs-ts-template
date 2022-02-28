export interface IConfig {
  NODE_ENV: 'production' | 'development';
  DEPLOY_ENV: 'production' | 'pre-production' | 'uat' | 'sit' | 'local';
  PORT: string;
  DATABASE_URL: string;
  LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
}
