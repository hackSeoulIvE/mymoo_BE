import { Exclude, Expose, Type } from "class-transformer";
import { User } from "src/users/entities/user.entity";

class UserReturnDto {
    @Exclude()
    id: number;

    @Exclude()
    user_id: string;

    @Exclude()
    password: string;

    @Exclude()
    email: string;

    @Expose()
    nickname: string;

    @Exclude()
    refreshtoken: string;

    @Exclude()
    refreshTokenExpiresIn: Date;

    @Exclude()
    isSocialAccount: boolean;

    @Exclude()
    externalId: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date | null;
}

export class meetingReturnDto {
    @Expose()
    id: number;

    @Expose()
    meeting_name: string;

    @Expose()
    meeting_description: string;

    @Expose()
    type: string;

    @Expose()
    is_flash: boolean;

    @Expose()
    user_count: number;

    @Expose()
    deadline: Date;

    @Expose()
    meeting_date: Date;

    @Expose()
    min_user: number;

    @Expose()
    max_user: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    deletedAt: Date | null;

    @Expose()
    @Type(() => UserReturnDto)
    created_by: UserReturnDto;

    @Expose()
    @Type(() => UserReturnDto)
    meetingUsers: UserReturnDto[];

    @Expose()
    @Type(() => UserReturnDto)
    likedUsers: UserReturnDto[];
}