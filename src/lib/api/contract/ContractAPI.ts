import { ContractBody } from '@/lib/api/contract/types/ContractBody';
import { DeleteEntrantBody } from '@/lib/api/contract/types/DeleteEntrantBody';
import { EntrantsPriorityBody } from '@/lib/api/contract/types/EntrantsPriorityBody';
import { PriorityDataBody } from '@/lib/api/contract/types/PriorityDataBody';
import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { AdminContractBody } from './types/AdminContractBody';

class ContractAPI {
  async createContract(body: ContractBody) {
    const { data } = await client.post('/documents/contract', body);
    return data;
  }

  async createAdminContract(body: AdminContractBody) {
    const { data } = await client.post(
      '/entrants/contract',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getEntrantPriority(body: EntrantsPriorityBody) {
    const data = await client.get(`/entrants/priority`, {
      params: body,
      ...getAuthorizationHeader(),
    });
    return data.data;
  }

  async entrantPriorityApprove(body: EntrantsPriorityBody) {
    await client.patch(
      '/entrants/priority/approve',
      body,
      getAuthorizationHeader(),
    );
  }

  async createPriority(body: PriorityDataBody) {
    const { data } = await client.post('/documents/priority', body);
    return data;
  }

  async deleteEntrant(body: DeleteEntrantBody) {
    const { data } = await client.delete('/entrants', {
      params: body,
      ...getAuthorizationHeader(),
    });
    return data;
  }
}

export default new ContractAPI();
