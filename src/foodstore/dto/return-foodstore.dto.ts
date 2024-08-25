import { Exclude, Expose, Type } from "class-transformer";

export class UserReturnDto {
    @Expose()
    id: number;

    @Expose()
    nickname: string;

    @Exclude()
    password: string;

    @Exclude()
    refreshtoken: string;

    @Exclude()
    refreshTokenExpiresIn: Date;

    @Expose()
    user_id: string;

    @Expose()
    created_at: Date;

    @Expose()
    deleted_at: Date | null;

    toJSON() {
        const { password, refreshtoken, refreshTokenExpiresIn, ...rest } = this;
        return rest;
    }
}

export class ReturnFoodDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    price: number;

    @Expose()
    discount_price: number;

    @Expose()
    image_url: string;

    @Expose()
    is_soldout: boolean;

    @Expose()
    created_at: Date;

    @Expose()
    deleted_at: Date | null;
}

export class ReturnCommentDto {
    @Expose()
    id: number;

    @Expose()
    description: string;

    @Expose()
    created_at: Date;

    @Expose()
    deleted_at: Date | null;

    @Expose()
    @Type(() => UserReturnDto)
    user: UserReturnDto;
}

export class ReturnStoreDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    start_Time: string;

    @Expose()
    end_Time: string;

    @Expose()
    latitude: number;

    @Expose()
    longitude: number;

    @Expose()
    score_type: string;

    @Expose()
    location: string;

    @Expose()
    is_open: boolean;

    @Expose()
    created_at: Date;

    @Expose()
    deleted_at: Date | null;

    @Expose()
    @Type(() => ReturnFoodDto)
    foods: ReturnFoodDto[];

    @Expose()
    @Type(() => ReturnCommentDto)
    comments: ReturnCommentDto[];
}