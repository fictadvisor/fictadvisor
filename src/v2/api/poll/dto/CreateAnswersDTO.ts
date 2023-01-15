export interface CreateAnswersDTO {
  answers: {
    questionId: string,
    value: string,
  }[]
}