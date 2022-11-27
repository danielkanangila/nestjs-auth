import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    dateLastLoginAttempt: Date;

    @Expose()
    dateLastLogin: Date;

    @Expose()
    email: string;

    @Expose()
    phone: string;

    @Expose()
    emailVerified: boolean;

    @Expose()
    phoneVerified: boolean;

    @Expose()
    verificationToken: string;

    @Expose()
    status: string;

    @Expose()
    createdAt: Date;

    @Expose()
    lastUpdatedAt: Date;
}
