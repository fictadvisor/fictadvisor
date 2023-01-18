import { client, getAuthorizationHeader } from "../index";
import { SuperheroVerificationBody } from "./dto/SuperheroVerificationBody";
import { SendSuperheroRequestBody } from "./dto/SendSuperheroRequestBody";

export class SuperheroAPI {

    static async superheroVerification(accessToken: string, userId: string, state: string, body: SuperheroVerificationBody) {
        return (await client.patch(
            `/user/superhero/verify/`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async sendSuperheroRequest(accessToken: string, dorm: boolean, body: SendSuperheroRequestBody) {
        return (await client.post(
            `/user/superhero/`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

}
