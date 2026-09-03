import {
  SelectiveFileResponse,
  SelectiveFilesResponse,
  SelectiveParseResponse,
} from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';

class SelectiveFileAPI {
  async getAll(): Promise<SelectiveFilesResponse> {
    const { data } =
      await client.get<SelectiveFilesResponse>('/selectiveFiles');
    return data;
  }

  // The server names the object after the year, so the browser's file name
  // never reaches storage.
  async upload(year: number, file: File): Promise<SelectiveFileResponse> {
    const body = new FormData();
    body.append('file', file);

    const { data } = await client.post<SelectiveFileResponse>(
      '/selectiveFiles',
      body,
      { params: { year } },
    );
    return data;
  }

  async delete(year: number): Promise<void> {
    await client.delete(`/selectiveFiles/${year}`);
  }

  async parse(year: number, semester: number): Promise<SelectiveParseResponse> {
    const { data } = await client.post<SelectiveParseResponse>(
      `/selectiveFiles/${year}/parse`,
      undefined,
      { params: { semester } },
    );
    return data;
  }
}

export default new SelectiveFileAPI();
