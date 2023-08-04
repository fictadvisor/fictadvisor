import {
  ContractBody,
  EntrantsPriorityBody,
  PriorityData,
} from '@/lib/api/contract/types/ContractBody';
import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { AdminContractData } from './types/ContractBody';

class ContractAPI {
  async createContract(body: ContractBody) {
    const { data } = await client.post('/documents/contract', body);
    return data;
  }

  async createAdminContract(body: AdminContractData) {
    const { data } = await client.post(
      '/entrants/contract',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getEntrantPriority(body: EntrantsPriorityBody) {
    const data = await client.get(
      `/entrants/priority?firstName=${body.firstName}&middleName=${body.middleName}&lastName=${body.lastName}`,
      getAuthorizationHeader(),
    );
    return data.data;
  }

  async entrantPriorityApprove(body: EntrantsPriorityBody) {
    await client.patch(
      '/entrants/priority/approve',
      body,
      getAuthorizationHeader(),
    );
  }

  async createPriority(body: PriorityData) {
    const { data } = await client.post('/documents/priority', body);
    return data;
  }
}

export default new ContractAPI();
