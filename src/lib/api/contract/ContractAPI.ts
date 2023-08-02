import { ContractBody } from '@/lib/api/contract/types/ContractBody';
import { client } from '@/lib/api/instance';
class ContractAPI {
  async createContract(body: ContractBody) {
    const { data } = await client.post('/documents/contract', body);
    return data;
  }
}

export default new ContractAPI();
