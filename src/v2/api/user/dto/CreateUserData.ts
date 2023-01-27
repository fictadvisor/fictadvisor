import { State } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";

export class CreateUserData {
    
    @MinLength(4, {
        message: 'username is too short (min: 4)',
    })
    @MaxLength(30, {
        message: 'username is too long (max: 30)',
    })
    @IsNotEmpty({
        message: 'username can not be empty',
    })
    @IsOptional()
    username?: string;
    
    @IsOptional()
    state?: State;

    @IsOptional()
    lastPasswordChanged?: Date;

    @IsOptional()
    password?: string;

    @MaxLength(400, {
        message: 'avatar link is too long (max: 400)',
    })
    @IsOptional()
    avatar?: string;

    @IsNotEmpty({
        message: 'email can not be empty',
    })
    @IsEmail()
    @IsOptional()
    email:string;

    @IsNotEmpty({
        message: 'telegram id can not be empty',
    })
    @IsOptional()
    telegramId: string;
}