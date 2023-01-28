import {Injectable, PipeTransform} from "@nestjs/common";
import {User} from "@prisma/client";
import {UserRepository} from "./UserRepository";
import {InvalidEntityIdException} from "../../utils/exceptions/InvalidEntityIdException";


@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<User>> {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async transform(id: string) {
    const user: User = await this.userRepository.get(id);
    if(!user) {
      throw new InvalidEntityIdException('user');
    }
    return user;
  }
}