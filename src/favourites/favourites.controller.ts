import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Favourite } from './entities/favourite.entity';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) { }

  @Post()
  favourite(@Body() createFavouriteDto: CreateFavouriteDto): Promise<Favourite> {
    const { user_id, pokemon_id } = createFavouriteDto;
    if (!user_id) {
      throw new BadRequestException('user_id is required');
    }
    if (!pokemon_id) {
      throw new BadRequestException('pokemon_id is required');
    }
    return this.favouritesService.favourite(createFavouriteDto);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }

  @Get(':user_id')
  findByuser_id(@Param('user_id') user_id: number): Promise<Favourite[]> {
    return this.favouritesService.findByuser_id(user_id);
  }

  @Patch(':user_id')
  update(@Param('user_id') user_id: number, @Body() updateFavouriteDto: UpdateFavouriteDto): Promise<Favourite> {
    return this.favouritesService.update(user_id, updateFavouriteDto);
  }

  @Delete()
  async unfavourite(@Body() body: { user_id: number; pokemon_id?: number }) {
    if (!body.user_id) {
      throw new BadRequestException('user_id is required');
    }

    if (body.pokemon_id) {
      await this.favouritesService.unfavourite(body.user_id, body.pokemon_id);
      return { message: 'Pokemon unfavourited successfully' };
    } else {
      await this.favouritesService.unfavouriteAll(body.user_id);
      return { message: 'All favourites removed for user' };
    }
  }
}
