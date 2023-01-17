import { client, getAuthorizationHeader, QueryParams } from "../index";
import { GetTeacherDTO } from "./dto/GetTeacherDTO";
import { CreateTeacherBody } from "./dto/CreateTeacherBody";
import { AddContactsBody } from './dto/AddContactsBody';
import { UpdateTeacherBody } from './dto/UpdateTeacherBody';


export class TeacherAPI {
    static async get(accessToken: string, teacherId: string): Promise<GetTeacherDTO> {
        return (await (client.get(`/teachers/${teacherId}`
            , getAuthorizationHeader(accessToken)))).data;
    }

    static async getAll(accessToken: string, search?:string ): Promise<GetTeacherDTO[]> {
        return (await (client.get(
            `/teachers?search=${search?search:''}`,
            getAuthorizationHeader(accessToken),
        ))).data;
    }

    static async create(accessToken: string, body: CreateTeacherBody) {
        return (await client.post('/teachers',
            body,
            getAuthorizationHeader(accessToken)
        )).data;
    }

    static async addContacts(accessToken: string, teacherId: string, body: AddContactsBody) {
        return (await client.post(`/teachers/${teacherId}/contacts`,
            body,
            getAuthorizationHeader(accessToken))).data
    }

    static async update(accessToken: string, teacherId: string, body: UpdateTeacherBody) {
        return (await client.patch(`/teachers/${teacherId}`,
            body,
            getAuthorizationHeader(accessToken))).data
    }

    static async delete(accessToken:string,teacherId:string){
        return (await client.delete(`/teachers/${teacherId}`,
        getAuthorizationHeader(accessToken))).data
    }

}