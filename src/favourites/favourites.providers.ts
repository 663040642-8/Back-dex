import { DataSource } from 'typeorm';
import { Favourite } from './entities/favourite.entity';

export const favouriteProviders = [
  {
    provide: 'FAVOURITE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Favourite),
    inject: ['DATA_SOURCE'],
  },
];
