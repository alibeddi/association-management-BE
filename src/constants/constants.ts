export const DAY_IN_MILLISECOND = 24 * 60 * 60 * 1000;
export const MINUTE_ON_MILLISECOND = 60 * 1000;
export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MEGABYTE_IN_BYTE = 1024 * 1024;

export enum EnvironmentEnum {
  dev = 'dev',
  prod = 'prod',
  test = 'test',
}

export enum RolesEnum {
  admin = 'admin',
  user = 'user',
  visitor = 'visitor',
}

export enum TokenEnum {
  access = 'access',
  refresh = 'refresh',
  reset = 'reset',
}
