import { client, getAuthorizationHeader } from "../index";
import { CreateTeacherGradeBody } from "./dto/CreateTeacherGradeBody";
import { GetTeacherQuestionsDTO } from "./dto/GetTeacherQuestionsDTO";


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
}