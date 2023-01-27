import {IsBoolean} from "class-validator";

export class RoleDTO {
  @IsBoolean()
  status: boolean;
  roleId: string;
}