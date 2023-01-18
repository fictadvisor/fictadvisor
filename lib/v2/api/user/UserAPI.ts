import { client, getAuthorizationHeader, QueryParams } from "../index"
import {addByMail} from "./dto/addByMail"
import {addContact} from "./dto/addContact"
export class UserAPI {

    static async addByMail(accessToken: string, body: addByMail){
        return (await (client.post('/users', body, getAuthorizationHeader(accessToken)))).data;
    }

    static async addContact(accessToken: string, body: addContact){
        return (await (client.post('/users/contacts', body, getAuthorizationHeader(accessToken)))).data;
    }   
}
