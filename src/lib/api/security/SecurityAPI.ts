import { client, getAuthorizationHeader } from "../index";
import { CreateRoleBody } from './dto/CreateRoleBody';
import { CreateGrantBody } from "./dto/CreateGrantBody";

export class SecurityAPI {
    static async roleDelete(accessToken: string, roleId: string) {
        return (await client.delete(
            `/roles/${roleId}`,
            getAuthorizationHeader(accessToken)
            ))
            .data
    }
    
    static async createRole(accessToken: string, body: CreateRoleBody) {
        return (await client.post('/roles', body, getAuthorizationHeader(accessToken))).data
    }

  static async createGrant(accessToken: string, roleId: string, body: CreateGrantBody) {
    return (await client.post(`/roles/${roleId}/grants`, body, getAuthorizationHeader(accessToken))).data;
  }

  static async deleteGrant(accessToken: string, grantId: string) {
    return (await client.delete(`/grants/${grantId}`, getAuthorizationHeader(accessToken)));
  }
}