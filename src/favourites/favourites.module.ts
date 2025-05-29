import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { DatabaseModule } from 'src/database/database.module';
import { favouriteProviders } from './favourites.providers';
import { userProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FavouritesController],
  providers: [FavouritesService, ...favouriteProviders, ...userProviders],
})
export class FavouritesModule {}
