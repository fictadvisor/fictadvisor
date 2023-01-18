import { client, getAuthorizationHeader } from "../index";
import { SuperheroVerificationBody } from "./dto/SuperheroVerificationBody";
import { SendSuperheroRequestBody } from "./dto/SendSuperheroRequestBody";

export class SuperheroAPI {

    static async superheroVerification(accessToken: string, body: SuperheroVerificationBody) {
        return (await client.patch(
            `/user/superhero/verify`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async sendSuperheroRequest(accessToken: string, body: SendSuperheroRequestBody) {
        return (await client.post(
            `/user/superhero`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

}
