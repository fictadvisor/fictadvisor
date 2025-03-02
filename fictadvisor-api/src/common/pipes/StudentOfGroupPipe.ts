import { Injectable, PipeTransform } from '@nestjs/common';
import { StudentOfGroupDTO } from '@fictadvisor/utils/requests';
import { UserRepository } from '../../database/v2/repositories/UserRepository';
import { GroupRepository } from '../../database/v2/repositories/GroupRepository';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export class StudentOfGroupPipe implements PipeTransform<StudentOfGroupDTO, Promise<StudentOfGroupDTO>> {
  constructor (
    private userRepository: UserRepository,
    private groupRepository: GroupRepository,
  ) {}

  async transform ({ groupId, userId }: StudentOfGroupDTO): Promise<StudentOfGroupDTO> {
    const user = await this.userRepository.findById(userId);
    const group = await this.groupRepository.findById(groupId);
    
    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    if (!group) {
      throw new InvalidEntityIdException('Group');
    }

    if (user.student.groupId !== group.id) {
      throw new InvalidEntityIdException('User');
    }
    
    return { groupId, userId };
  }
}
