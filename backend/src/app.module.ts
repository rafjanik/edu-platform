import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      logging: true,
      synchronize: true,
      entities: ['dist/**/*.entity.{js,ts}'],
      migrationsRun: false,
      migrations: ['dist/database/migrations/*.{js,ts}'],
      migrationsTableName: 'migrations',
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
