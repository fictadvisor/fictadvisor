import { client, getAuthorizationHeader } from "../index";
import { refreshAccessTokenDTO } from "./dto/refreshAccesTokenDTO";
import { tokensDTO } from "./dto/tokensDTO";
import { changePasswordBody } from "./dto/changePasswordBody";
import { authTelegramBody } from "./dto/authTelegramBody";
import { authBody } from "./dto/authBody";
import { registerBody } from "./dto/registerBody";
import { resetPasswordDTO } from "./dto/resetPasswordDTO";
import { confirmPasswordResetBody } from "./dto/confirmPasswordResetBody";
import { resetPasswordBody } from "./dto/resetPasswordBody";

export class AuthAPI {
    static async refreshAccessToken(refreshToken: string): Promise<refreshAccessTokenDTO> {
        return (await client.patch('/auth/refresh', null, getAuthorizationHeader(refreshToken))).data

    }

    static async changePassword(accessToken: string, body: changePasswordBody): Promise<tokensDTO> {
        return (await client.patch('/auth/updatePassword', body, getAuthorizationHeader(accessToken))).data

    }

    static async authTelegram(body: authTelegramBody): Promise<tokensDTO> {
        return (await client.post('/auth/login', body)).data

    }

    static async auth(body: authBody): Promise<tokensDTO> {
        return (await client.post('/auth/login', body)).data

    }

    static async register(body: registerBody): Promise<tokensDTO> {
        return (await client.post('/auth/register', body)).data
    }

    static async resetPassword(resetToken:string,body:resetPasswordBody):Promise<resetPasswordDTO>{
        return (await client.patch(`/users/resetPassword/${resetToken}`,
        body
        )).data
    }

    static async confirmPasswordReset(body:confirmPasswordResetBody){
        return (await client.post('/users/resetPassword',body)).data
    }
}