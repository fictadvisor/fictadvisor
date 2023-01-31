export interface CreateAnswersDTO {
  answers: Array<{
    questionId: string
    value: string
  }>
}
