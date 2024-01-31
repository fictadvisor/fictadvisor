import { Injectable } from '@nestjs/common';
import { StudentResource } from '@prisma/client';

@Injectable()
export class ResourceMapper {
  getResource (resource: StudentResource) {
    return {
      id: resource.id,
      name: resource.name,
      link: resource.link,
      imageLink: resource.imageLink,
    };
  }

  getResources (resources: StudentResource[]) {
    return resources.map((resource) => this.getResource(resource));
  }
}