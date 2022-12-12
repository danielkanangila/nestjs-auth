import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from './../users/users.entity';

@Entity()
export class UserAuthDevices {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Expose()
  @ManyToOne(() => User, (user) => user.authDevices)
  user: User;

  @Expose()
  @Column({ nullable: true, type: 'text' })
  userAgent: string;

  @Expose()
  @Index({ unique: true })
  @Column({ type: 'text' })
  deviceToken: string;

  @Expose()
  @Column({ nullable: true })
  deviceType: string;

  @Expose()
  @Column({ nullable: true })
  deviceModel: string;

  @Expose()
  @Column({ nullable: true })
  deviceBrand: string;

  @Expose()
  @Column({ nullable: true })
  osName: string;

  @Expose()
  @Column({ nullable: true })
  osVersion: string;

  @Expose()
  @Column({ nullable: true })
  osPlatform: string;

  @Expose()
  @Column({ nullable: true })
  clientName: string;

  @Expose()
  @Column({ nullable: true })
  clientVersion: string;

  @Expose()
  @Column({ nullable: true })
  clientEngine: string;

  @Expose()
  @Column({ nullable: true })
  clientEngineVersion: string;

  @Expose()
  @Column({ nullable: true })
  clientType: string;

  @Expose()
  @Column({ nullable: true })
  ip: string;

  @Expose()
  @Column({ type: 'boolean', default: false })
  revoked: boolean;

  @Expose()
  @Column({ default: 'active' })
  status: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
