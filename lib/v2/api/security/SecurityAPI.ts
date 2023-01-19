import { client, getAuthorizationHeader } from "../index";
import { CreateRoleBody } from './dto/CreateRoleBody';

export class AuthAPI {
    static async createRole(accessToken: string, body: CreateRoleBody) {
        return (await client.post('/roles', body, getAuthorizationHeader(accessToken))).data
    }
}