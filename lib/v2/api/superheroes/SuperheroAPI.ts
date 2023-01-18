import { client, getAuthorizationHeader } from "../index";
import { SuperheroVerificationBody } from "./dto/SuperheroVerificationBody";
import { SendSuperheroRequestBody } from "./dto/SendSuperheroRequestBody";

export class SuperheroAPI {

    static async superheroVerification(accessToken: string, userId: string, state: string, body: SuperheroVerificationBody) {
        return (await client.patch(
            `/api/v2/user/superhero/verify/${userId}/${state}`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async sendSuperheroRequest(accessToken: string, dorm: boolean, body: SendSuperheroRequestBody) {
        return (await client.post(
            `/api/v2/user/superhero/${dorm}`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

}
