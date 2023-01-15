import { client, getAuthorizationHeader, QueryParams } from "../index";
import { GetTeacherDTO } from "./dto/GetTeacherDTO";
import { RequestObject } from "./dto/RequestObject";
import { CreateTeacherBodyDTO } from "./dto/CreateTeacherBodyDTO";
import { AddContactsBodyDTO } from './dto/AddContactsBodyDTO';
import { UpdateTeacherBodyDTO } from './dto/UpdateTeacherBodyDTO';


export class TeacherAPI {
    static async get(accessToken: string, teacherId: string): Promise<GetTeacherDTO> {
        return (await (client.get(`/teachers/${teacherId}`
            , getAuthorizationHeader(accessToken)))).data;
    }

    static async getAll(accessToken: string, RequestObject: RequestObject): Promise<GetTeacherDTO[]> {
        return (await (client.get(
            `/teachers`,
            {
                ...getAuthorizationHeader(accessToken),
                ...RequestObject
            }
        ))).data;
    }

    static async create(accessToken: string, body: CreateTeacherBodyDTO) {
        return (await client.post('/teachers',
            body,
            getAuthorizationHeader(accessToken)
        )).data;
    }

    static async addContacts(accessToken: string, teacherId: string, body: AddContactsBodyDTO) {
        return (await client.post(`/teachers/${teacherId}/contacts`,
            body,
            getAuthorizationHeader(accessToken))).data
    }

    static async update(accessToken: string, teacherId: string, body: UpdateTeacherBodyDTO) {
        return (await client.patch(`/teachers/${teacherId}`,
            body,
            getAuthorizationHeader(accessToken))).data
    }

    static async delete(accessToken:string,teacherId:string){
        return (await client.delete(`/teachers/${teacherId}`,
        getAuthorizationHeader(accessToken))).data
    }

}