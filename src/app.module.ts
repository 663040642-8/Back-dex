import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { FavouritesModule } from './favourites/favourites.module';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, DatabaseModule, FavouritesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
