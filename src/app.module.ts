import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'lib/auth/auth.module';
import { UserAuditMiddleware } from 'lib/users/typeorm/users-audit.middleware';
import { UsersModule } from 'lib/users/typeorm/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'auth_nest',
      password: '1234',
      database: 'nest_auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(UserAuditMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
