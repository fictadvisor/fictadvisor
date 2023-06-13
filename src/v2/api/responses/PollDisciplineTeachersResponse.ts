import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';

class Subject {
	@ApiProperty()
	  id: string;

	@ApiProperty()
	  name: string;
}

export class PollDisciplineTeachersResponse {
	@ApiProperty()
	  disciplineTeacherId: string;

	@ApiProperty({
	  enum: TeacherRole,
	})
	  roles: TeacherRole;

	@ApiProperty()
	  firstName: string;

	@ApiProperty()
	  middleName: string;

	@ApiProperty()
	  lastName: string;

	@ApiProperty()
	  avatar: string;

	@ApiProperty()
	  subject: Subject;
}