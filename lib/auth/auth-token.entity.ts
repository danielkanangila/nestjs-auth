import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  token: string;

  @Column({ nullable: true })
  @Index()
  refreshToken: string;

  @Column()
  @Index()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
