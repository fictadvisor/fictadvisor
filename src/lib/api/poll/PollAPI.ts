import { client, getAuthorizationHeader } from "../index";
import { CreateTeacherGradeBody } from "./dto/CreateTeacherGradeBody";
import { GetTeacherQuestionsDTO } from "./dto/GetTeacherQuestionsDTO";
import {CreateQuestionBody} from "./dto/CreateQuestionBody";
import {DeleteQuestionBody} from "./dto/DeleteQuestionBody";
import {QuestionRolesBody} from "./dto/QuestionRolesBody";


export class PollAPI {
    static async getTeacherQuestions(accessToken: string, disciplineTeacherId: string): Promise<GetTeacherQuestionsDTO> {
        return (await client.get(`/poll/answers/${disciplineTeacherId}`, getAuthorizationHeader(accessToken))).data;
    }
    
	static async createTeacherGrade(accessToken: string, body: CreateTeacherGradeBody, disciplineTeacherId: string) {
        return await client.post(
			`/poll/answers/${disciplineTeacherId}`, 
			body, 
			getAuthorizationHeader(accessToken)
			);
    }

    static async createQuestion(accessToken: string, body: CreateQuestionBody) {
        return await client.post(
            `/poll/questions`,
            body,
            getAuthorizationHeader(accessToken)
        );
    }

    static async deleteQuestion(accessToken: string, body: DeleteQuestionBody, questionId: string) {
        return (await client.delete(`/questions/${questionId}`,
            getAuthorizationHeader(accessToken))).data
    }

    static async questionRoles(accessToken: string, body: QuestionRolesBody, role: string) {
        return await client.post(
            `/poll/questions/${role}`,
            body,
            getAuthorizationHeader(accessToken)
        );
    }
}