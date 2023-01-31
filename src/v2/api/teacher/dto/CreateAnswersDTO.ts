export class CreateAnswersDTO {
  answers: CreateAnswerDTO[];
}

export class CreateAnswerDTO {
  questionId: string;
  value: string;
}