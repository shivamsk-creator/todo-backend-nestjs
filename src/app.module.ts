import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60000s' },
  }), MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.DB_URL,
      dbName: process.env.DB_NAME
    }),
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
