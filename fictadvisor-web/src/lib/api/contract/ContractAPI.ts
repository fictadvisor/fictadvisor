import { Actions } from '@fictadvisor/utils/enums';
import {
  CreateContractDTO,
  DeleteEntrantDataQueryDTO,
  FullNameWithSpecialtyDTO,
  PriorityDTO,
  StudyContractDTO,
} from '@fictadvisor/utils/requests';
import {
  EntrantFullResponse,
  EntrantWithContractResponse,
  EntrantWithPriorityResponse,
} from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';

class ContractAPI {
  async createContract(body: StudyContractDTO): Promise<void> {
    await client.post('/documents/contract', body);
  }

  async createContractById(entrantId: string): Promise<void> {
    await client.get(`/documents/contract/${entrantId}`);
  }

  async sendPriorityOnEmail(entrantId: string): Promise<void> {
    await client.get(`/documents/priority/${entrantId}`);
  }

  async createAdminContract(body: CreateContractDTO): Promise<void> {
    await client.post<EntrantWithContractResponse>('/entrants/contract', body);
  }

  async getEntrantPriority(params: FullNameWithSpecialtyDTO) {
    const { data } = await client.get<EntrantWithPriorityResponse>(
      `/entrants/priority`,
      {
        params,
      },
    );
    return data;
  }

  async entrantPriorityApprove(body: FullNameWithSpecialtyDTO): Promise<void> {
    await client.patch('/entrants/priority/approve', body);
  }

  async approvePriorityById(entrantId: string): Promise<void> {
    await client.patch(`/entrants/priority/approve/${entrantId}`, {});
  }

  async createPriority(body: PriorityDTO): Promise<void> {
    await client.post('/documents/priority', body);
  }

  async deleteEntrant(params: DeleteEntrantDataQueryDTO): Promise<void> {
    await client.delete('/entrants/data', {
      params,
    });
  }

  async deleteEntrantData(entrantId: string, action: Actions): Promise<void> {
    await client.delete(`/entrants/${entrantId}`, {
      params: { action },
    });
  }

  async getEntrantInfo(body: FullNameWithSpecialtyDTO) {
    const { data } = await client.get<EntrantFullResponse>('/entrants', {
      params: body,
    });
    return data;
  }
}

export default new ContractAPI();
