import { LoggerService } from '@nestjs/common';

export type MfaFlow = 'email_token' | 'phone_token' | 'virtual_mfa_device';
export type NotificationEvent =
  | 'verify_email'
  | 'reset_password'
  | 'new_device'
  | 'verify_phone';
export interface DataSource {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface NotificationOptions {
  apiPublicKey: string;
  apiSecretKey: string;
}

export interface MfaOptions {
  globalEnabled?: boolean;
  userAdminEnabled?: boolean;
  flow?: MfaFlow[];
}
export interface Notification {
  events: NotificationEvent[];
  handler?(): any;
  options?: NotificationOptions;
}
export interface AuthModuleConfig {
  dataSource: DataSource;
  notification?: Notification;
  usersValidationMethod?: 'email' | 'phone';
  mfa?: MfaOptions;
  Logger?: LoggerService;
}
