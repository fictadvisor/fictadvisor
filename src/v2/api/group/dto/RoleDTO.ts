import {RoleName} from "@prisma/client";
import {IsNotEmpty} from "class-validator";

export class RoleDTO {
  @IsNotEmpty()
  roleName: RoleName;
}