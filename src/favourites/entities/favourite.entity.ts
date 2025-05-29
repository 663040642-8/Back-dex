import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";

@Entity()
export class Favourite {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  pokemon_id: number;

  @ManyToOne(() => User, user => user.favourites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
