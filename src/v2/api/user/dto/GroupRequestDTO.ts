import { IsBoolean, IsNotEmpty } from "class-validator";

export class GroupRequestDTO {
    @IsNotEmpty({
        message: 'groupId can not be empty',
      })
    groupId: string;

    @IsBoolean()
    @IsNotEmpty({
        message: 'isCaptain can not be empty',
      })
    isCaptain: boolean;
}