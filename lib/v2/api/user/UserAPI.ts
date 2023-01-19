import {client, getAuthorizationHeader} from "../index"
import {addByMailBody} from "./dto/addByMailBody"
import {addContactBody} from "./dto/addContactBody"
export class UserAPI {

    static async addByMailBody(accessToken: string, body: addByMailBody){
        return (await (client.post('/users', body, getAuthorizationHeader(accessToken)))).data;
    }

    static async addContactBody(accessToken: string, body: addContactBody){
        return (await (client.post('/users/contacts', body, getAuthorizationHeader(accessToken)))).data;
    }   
}
