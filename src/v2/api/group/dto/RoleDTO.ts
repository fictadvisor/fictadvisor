import {RoleName} from "@prisma/client";
import {IsEmpty} from "class-validator";

export class RoleDTO {
  @IsEmpty()
  roleName: RoleName;
}