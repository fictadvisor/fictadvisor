import { client, getAuthorizationHeader, QueryParams } from "../index";
import { GetTeacherDTO } from "./dto/GetTeacherDTO";
import { CreateTeacherBodyDTO } from "./dto/CreateTeacherBodyDTO";
import { RequestObject } from "./dto/RequestObject";

export class TeacherAPI {
    static async get( accessToken:string,teacherId:string): Promise<GetTeacherDTO> {
        return (await (client.get(`/teachers/${teacherId}`
        ,getAuthorizationHeader(accessToken)))).data;
    }

    static async getAll(accessToken: string,RequestObject): Promise<GetTeacherDTO[]> {
        return (await (client.get(`/teachers?search=${RequestObject?.search}`
        ,getAuthorizationHeader(accessToken)))).data;
    }

    static async create(accessToken: string, body: CreateTeacherBodyDTO) {
        await client.post('/teachers',
            body,
            getAuthorizationHeader(accessToken)
        );
    }

}
