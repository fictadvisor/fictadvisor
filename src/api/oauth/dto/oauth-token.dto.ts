import { Expose } from "class-transformer";

export class OAuthTokenDto {
    @Expose({ name: 'access_token' })
    accessToken: string;

    @Expose({ name: 'refresh_token' })
    refreshToken: string;

    public static of(accessToken: string, refreshToken: string) {
        const token = new OAuthTokenDto();

        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        
        return token;
    } 
};
