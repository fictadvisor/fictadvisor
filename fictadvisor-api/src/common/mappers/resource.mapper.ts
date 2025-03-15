import { ResourceResponse, ResourcesResponse } from '@fictadvisor/utils/responses';
import { Injectable } from '@nestjs/common';
import { StudentResource } from '@prisma/client/fictadvisor';

@Injectable()
export class ResourceMapper {
  getResource (resource: StudentResource): ResourceResponse {
    return {
      id: resource.id,
      name: resource.name,
      link: resource.link,
      imageLink: resource.imageLink,
    };
  }

  getResources (resources: StudentResource[]): ResourcesResponse {
    return {
      resources: resources.map(this.getResource),
    };
  }
}
