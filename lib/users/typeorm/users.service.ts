import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(payload: CreateUserDto): Promise<User> {
        const user = new User(payload);
        return this.usersRepository.save(user);
    }

    async update(id: string, payload: UpdateUserDto): Promise<User> {
        await this.usersRepository.update({ id }, payload);
        return this.usersRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findByCredentials(username: string): Promise<User> {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email: username })
            .orWhere('user.phone = :phone', { phone: username })
            .getOne();
        return user;
    }

    async checkIfUserExists(userDto: CreateUserDto): Promise<any> {
        const { username, email, phone } = userDto;
    
        const userFromEmail = await this.findByCredentials(email);
        const userFromUsername = await this.findByCredentials(username);
        const userFromPhoneNumber = await this.findByCredentials(phone);
    
        const messages = [];
    
        if (userFromEmail)
          messages.push('This email is already registered. Please login');
        else if (userFromUsername) messages.push('The username is already taken.');
        else if (userFromPhoneNumber)
          messages.push('This phone number is already registered.');
    
        return messages.length ? messages : null;
    }
}