export interface IConfig {
  NODE_ENV: 'production' | 'development';
  DEPLOY_ENV: 'production' | 'pre-production' | 'uat' | 'sit' | 'local';
  PORT: string;
  DATABASE_URL: string;
}
