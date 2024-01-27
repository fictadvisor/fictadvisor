import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { StudentOfGroupDTO } from '../dtos/StudentOfGroupDTO';
import { UserRepository } from '../../database/repositories/UserRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';

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