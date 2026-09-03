import { ApiProperty } from '@nestjs/swagger';

export class SelectiveFileResponse {
  @ApiProperty({
    description: 'Academic year the selectives belong to',
  })
    year: number;

  @ApiProperty({
    description: 'Name the file is stored under, assigned by the server',
  })
    name: string;

  @ApiProperty({
    description: 'Size of the stored file in bytes',
  })
    size: number;

  @ApiProperty({
    type: Date,
    description: 'When the file was uploaded',
  })
    updatedAt: string;
}

export class SelectiveFilesResponse {
  @ApiProperty({
    type: [SelectiveFileResponse],
    description: 'Uploaded selective files, newest year first',
  })
    files: SelectiveFileResponse[];
}

export class SelectiveParseResponse {
  @ApiProperty({
    description: 'Groups named by the file',
  })
    groups: number;

  @ApiProperty({
    description: 'Groups the file names that the database does not know',
  })
    skippedGroups: number;

  @ApiProperty({
    description: 'Disciplines created for the semester',
  })
    createdDisciplines: number;

  @ApiProperty({
    description: 'Selectives newly assigned to students',
  })
    assignedSelectives: number;

  @ApiProperty({
    description: 'Non-selective duplicates of those subjects that were removed',
  })
    deletedDisciplines: number;
}
