import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group } from '@prisma/client';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { GroupRepository } from './GroupRepository';
import { RoleRepository } from "../user/role/RoleRepository";
import { StudentRepository } from "../user/StudentRepository";
import {QueryAllDTO} from "../../utils/QueryAllDTO";

@Injectable()
export class GroupService {
  constructor(
    private disciplineService: DisciplineService,
    private disciplineRepository: DisciplineRepository,
    private groupRepository: GroupRepository,
    private prisma: PrismaService,
    private roleRepository: RoleRepository,
    private studentRepository: StudentRepository,
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
      for (const role of roles){
        if (String(role) == "captain"){
          return student;
        }
      }
    }

  }

  async deleteGroup(groupId: string) {
    await this.groupRepository.delete(groupId);
  }

  async getStudents(groupId: string) {
    await this.groupRepository.getStudents(groupId);
  }

}