import {Injectable, PipeTransform} from "@nestjs/common";
import {User} from "@prisma/client";
import {InvalidGroupIdException} from "../../utils/exceptions/InvalidGroupIdException";
import {UserRepository} from "./UserRepository";


@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<User>> {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async transform(id: string) {
    const user: User = await this.userRepository.get(id);
    if(!user) {
      throw new InvalidGroupIdException();
    }
    return user;
  }
}