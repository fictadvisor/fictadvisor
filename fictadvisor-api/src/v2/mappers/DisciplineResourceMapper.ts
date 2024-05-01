import { Injectable } from '@nestjs/common';
import { DbDisciplineResource } from '../database/entities/DbDisciplineResource';
import { DisciplineResourceResponse } from '@fictadvisor/utils/responses';

@Injectable()
export class DisciplineResourceMapper {
  getDisciplineResource (resource: DbDisciplineResource): DisciplineResourceResponse {
    const categories = resource.categories.map(({ category: { id, name } }) => ({
      id,
      name,
    }));

    return {
      ...resource,
      categories,
    }
  }

  getDisciplineResources (resources: DbDisciplineResource[]): DisciplineResourceResponse[] {
    return resources.map((resource) => this.getDisciplineResource(resource));
  }
}