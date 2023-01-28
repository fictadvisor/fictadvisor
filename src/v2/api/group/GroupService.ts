import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../database/PrismaService';
import {Group, State} from '@prisma/client';
import {DisciplineService} from '../discipline/DisciplineService';
import {DisciplineRepository} from '../discipline/DisciplineRepository';
import {GroupRepository} from './GroupRepository';
import {RoleRepository} from "../user/role/RoleRepository";
import {StudentRepository} from "../user/StudentRepository";
import {QueryAllDTO} from "../../utils/QueryAllDTO";
import {UserRepository} from "../user/UserRepository";
@Injectable()
export class GroupService {
  constructor(
    private disciplineService: DisciplineService,
    private disciplineRepository: DisciplineRepository,
    private groupRepository: GroupRepository,
    private prisma: PrismaService,
    private roleRepository: RoleRepository,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
  ) {}

  async create(code: string): Promise<Group>  {
    return await this.groupRepository.create(code);
  }

  async getAll(body: QueryAllDTO) {
    return this.groupRepository.getAll(body);
  }

  async get(id: string) {
    return this.groupRepository.getGroup(id);
  }

  async getDisciplineTeachers(groupId: string) {
    const disciplines = await this.getDisciplines(groupId);

    for (const discipline of disciplines) {
      discipline.teachers = await this.disciplineService.getTeachers(discipline.id);
    }

    return disciplines;
  }

  async getDisciplines(groupId: string) {
    const disciplines = await this.groupRepository.getDisciplines(groupId);
    const results = [];
    for (const discipline of disciplines) {
      const subject = await this.disciplineRepository.getSubject(discipline.id);
      results.push({
        id: discipline.id,
        subjectName: subject.name,
      });
    }

    return results;
  }

  async getCaptain(groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);
    for (const student of students) {
      const roles = await this.studentRepository.getRoles(student.userId);
      for (const ROLE of roles){
        if ( ROLE ){
          return student;
        }
      }
    }

  }

  async deleteGroup(groupId: string) {
    await this.groupRepository.delete(groupId);
  }

  async getStudents(groupId: string) {
    let students = await this.groupRepository.getStudents(groupId);
    students = students.filter(st => st.state === State.APPROVED);
    const results = [];
    for (const student of students){
      const user = await this.userRepository.get(student.userId)
      results.push({
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        email: user.email,
        userName: user.username,
        avatar: user.avatar,
      })
    }
    return results;
  }

  async updateGroup(groupId: string){
    await this.groupRepository.updateGroup(groupId);
  }

}