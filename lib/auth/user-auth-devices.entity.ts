import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from './../users/users.entity';

@Entity()
@Unique('idx_unq_uid_dtoken', ['deviceToken', 'user.id'])
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
  @Index()
  @Column({ type: 'text', name: 'deviceToken' })
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
  isRevoked: boolean;

  @Expose()
  @Column({ default: 'active' })
  @Index()
  status: string;

  @Expose()
  @Column({ type: 'timestamp', nullable: true })
  @Index()
  dateLastLogin: Date;

  @Expose()
  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @Expose()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
