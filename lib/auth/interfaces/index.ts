export interface DataSource {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
export interface AuthModuleConfig {
  dataSource: DataSource;
}
