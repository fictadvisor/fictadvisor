import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { SendSuperheroRequestBody } from './dto/SendSuperheroRequestBody';
import { SuperheroVerificationBody } from './dto/SuperheroVerificationBody';
import { UpdateGrantBody } from './dto/UpdateGrantBody';
import { UpdateRoleBody } from './dto/UpdateRoleBody';

export class SuperheroAPI {
  static async superheroVerification(body: SuperheroVerificationBody) {
    const { data } = await client.patch(
      `/user/superhero/verify`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async sendSuperheroRequest(body: SendSuperheroRequestBody) {
    const { data } = await client.post(
      `/user/superhero`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async updateRoleBody(body: UpdateRoleBody, roleId: string) {
    const { data } = await client.patch(
      `/role/${roleId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async updateGrantBody(body: UpdateGrantBody, grantId: string) {
    const { data } = await client.patch(
      `/grants/${grantId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
}
