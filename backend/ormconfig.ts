import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'qwerty',
  database: 'eduplatform',
  entities: ['dist/**/*.entity.{js, ts}'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/database/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
});
