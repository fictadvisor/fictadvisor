import { client, getAuthorizationHeader } from "../index";
import { resetPasswordBody } from "./dto/resetPasswordBody";

export class AuthAPI {
    static async resetPassword(accessToken: string, password: string, body: resetPasswordBody) {
        return (await client.post(
            `user/resetPassword`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }
}
