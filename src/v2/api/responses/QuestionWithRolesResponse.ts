import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionDisplay, QuestionType } from '@prisma/client';
import { CreateQuestionRoleDTO } from '../dtos/CreateQuestionRoleDTO';

export class QuestionWithRolesResponse {
	@ApiProperty() 
	  id: string;

	@ApiProperty()
	  category: string;

	@ApiProperty()
	  name: string;

	@ApiProperty()
	  order: number;

	@ApiPropertyOptional()
	  description?: string;

	@ApiProperty()
	  text: string;

	@ApiProperty()
	  isRequired: boolean;

	@ApiPropertyOptional()
	  criteria?: string;

	@ApiProperty({
	  enum: QuestionType,
	})
	  type: QuestionType;

	@ApiProperty({
	  enum: QuestionDisplay,
	})
	  display: QuestionDisplay;

	@ApiProperty({
	  type: [CreateQuestionRoleDTO],
	})
	  roles: CreateQuestionRoleDTO[];
}