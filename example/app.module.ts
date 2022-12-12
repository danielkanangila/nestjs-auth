import { Module } from '@nestjs/common';
import { AuthModule } from 'lib/auth/auth.module';

@Module({
  imports: [
    AuthModule.register({
      dataSource: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'nest_auth',
      },
    }),
  ],
})
export class AppModule {}
