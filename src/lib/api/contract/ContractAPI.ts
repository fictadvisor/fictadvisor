import {
  ContractBody,
  PriorityData,
} from '@/lib/api/contract/types/ContractBody';
import { client } from '@/lib/api/instance';
class ContractAPI {
  async createContract(body: ContractBody) {
    const { data } = await client.post('/documents/contract', body);
    return data;
  }

  async createPriority(body: PriorityData) {
    const { data } = await client.post('/documents/priority', body);
    return data;
  }
}

export default new ContractAPI();
