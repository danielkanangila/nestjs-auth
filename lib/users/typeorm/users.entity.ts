import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Expose()
  @Column({ nullable: true })
  firstName: string;

  @Expose()
  @Column({ nullable: true })
  lastName: string;

  @Expose()
  @Column({ type: 'timestamp', nullable: true })
  dateLastLoginAttempt: Date;

  @Expose()
  @Column({ type: 'timestamp', nullable: true })
  dateLastLogin: Date;

  @Expose()
  @Index()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Index()
  @Column({ nullable: true, unique: true })
  phone: string;

  @Expose()
  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Expose()
  @Column({ type: 'boolean', default: false })
  phoneVerified: boolean;

  @Exclude()
  @Column({ nullable: true })
  verificationToken: string;

  @Expose()
  @Column({ default: 'inactive' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  lastUpdateAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
  }
}
