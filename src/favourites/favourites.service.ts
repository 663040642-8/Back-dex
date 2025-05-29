import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Repository } from 'typeorm';
import { Favourite } from './entities/favourite.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @Inject('FAVOURITE_REPOSITORY')
    private favouriteRepository: Repository<Favourite>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async favourite(createFavouriteDto: CreateFavouriteDto): Promise<Favourite> {
    const user = await this.userRepository.findOne({ where: { id: createFavouriteDto.user_id } });
    if (!user) throw new NotFoundException('User not found');

    const existingFavourite = await this.favouriteRepository.findOne({
      where: { user_id: user.id, pokemon_id: createFavouriteDto.pokemon_id },
    });
    if (existingFavourite) {
      throw new Error(`Favourite for ${createFavouriteDto.pokemon_id} already exists for user_id: ${user.id}`);
    }
    const favourite = this.favouriteRepository.create({
      pokemon_id: createFavouriteDto.pokemon_id,
      user,
      user_id: user.id,
    });
    return this.favouriteRepository.save(favourite);
  }

  findAll(): Promise<Favourite[]> {
    return this.favouriteRepository.find();
  }

  findOne(user_id: number): Promise<Favourite | null> {
    return this.favouriteRepository.findOne({ where: { user_id } });
  }

  async update(user_id: number, updateFavouriteDto: UpdateFavouriteDto): Promise<Favourite> {
    const favourite = await this.findOne(user_id);
    if (!favourite) {
      throw new Error(`Favourite with user_id: ${user_id} not found`);
    }
    Object.assign(favourite, updateFavouriteDto);
    return this.favouriteRepository.save(favourite);
  }

  async remove(user_id: number): Promise<void> {
    const favourite = await this.findOne(user_id);
    if (!favourite) {
      throw new Error(`Favourite with user_id: ${user_id} not found`);
    }
    await this.favouriteRepository.remove(favourite);
  }

  async findByuser_id(user_id: number): Promise<Favourite[]> {
    return this.favouriteRepository.find({
      where: { user_id },
    });
  }

  async unfavourite(user_id: number, pokemon_id: number): Promise<void> {
    const favourite = await this.favouriteRepository.findOne({
      where: { user_id, pokemon_id }
    });
    if (!favourite) {
      throw new NotFoundException('Favourite not found');
    }
    await this.favouriteRepository.remove(favourite);
  }

  async unfavouriteAll(user_id: number): Promise<void> {
    await this.favouriteRepository.delete({ user_id });
  }
}
