import { client, getAuthorizationHeader } from "../index";

export class SecurityAPI {
    static async roleDelete(accessToken: string, roleId: string) {
        return (await client.delete(
            `/roles/${roleId}`,
            getAuthorizationHeader(accessToken)
            ))
            .data
    }
}