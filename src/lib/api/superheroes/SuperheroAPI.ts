import { client, getAuthorizationHeader } from '../index';

import { SendSuperheroRequestBody } from './dto/SendSuperheroRequestBody';
import { SuperheroVerificationBody } from './dto/SuperheroVerificationBody';
import { updateGrantBody } from './dto/updateGrantBody';
import { updateRoleBody } from './dto/updateRoleBody';

export class SuperheroAPI {
  static async superheroVerification(
    accessToken: string,
    body: SuperheroVerificationBody,
  ) {
    return await client.patch(
      `/user/superhero/verify`,
      body,
      getAuthorizationHeader(accessToken),
    );
  }

  static async sendSuperheroRequest(
    accessToken: string,
    body: SendSuperheroRequestBody,
  ) {
    return await client.post(
      `/user/superhero`,
      body,
      getAuthorizationHeader(accessToken),
    );
  }

  static async updateRoleBody(
    accessToken: string,
    body: updateRoleBody,
    roleId: string,
  ) {
    return (
      await client.patch(
        `/role/${roleId}`,
        body,
        getAuthorizationHeader(accessToken),
      )
    ).data;
  }

  static async updateGrantBody(
    accessToken: string,
    body: updateGrantBody,
    grantId: string,
  ) {
    return (
      await client.patch(
        `/grants/${grantId}`,
        body,
        getAuthorizationHeader(accessToken),
      )
    ).data;
  }
}
