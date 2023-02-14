import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group, Role, RoleName, State, User } from '@prisma/client';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { GroupRepository } from './GroupRepository';
import { StudentRepository } from "../user/StudentRepository";
import { QueryAllDTO } from "../../utils/QueryAllDTO";
import { UserRepository } from "../user/UserRepository";
import { EmailDTO } from "./dto/EmailDTO";
import { ApproveDTO } from "../user/dto/ApproveDTO";
import { NoPermissionException } from "../../utils/exceptions/NoPermissionException";
import { RoleDTO } from "./dto/RoleDTO";
import { UpdateGroupDTO } from "./dto/UpdateGroupDTO";
import { UserService } from '../user/UserService';
import { DisciplineTeacherService } from "../teacher/DisciplineTeacherService";

@Injectable()
export class GroupService {
  constructor(
    private disciplineService: DisciplineService,
    private disciplineTeacherService: DisciplineTeacherService,
    private disciplineRepository: DisciplineRepository,
    private groupRepository: GroupRepository,
    private prisma: PrismaService,
    private userService: UserService,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
  ) {}

  async create(code: string): Promise<Group>  {
    return this.groupRepository.create(code);
  }

  async getAll(body: QueryAllDTO) {
    return this.groupRepository.getAll(body);
  }

  async get(id: string) {
    return this.groupRepository.getGroup(id);
  }

  async getDisciplineTeachers(groupId: string) {
    const disciplines = await this.groupRepository.getDisciplines(groupId);

    return disciplines.map((d) => ({
      id: d.id,
      subject: d.subject,
      year: d.year,
      semester: d.semester,
      isSelective: d.isSelective,
      teachers: this.disciplineTeacherService.getTeachers(d.disciplineTeachers),
    }));
  }

  async getDisciplines(groupId: string) {
    const disciplines = await this.groupRepository.getDisciplines(groupId);

    return disciplines.map((d) => ({
      id: d.id,
      subject: d.subject,
      year: d.year,
      semester: d.semester,
      isSelective: d.isSelective,
    }));
  }

  async addUnregistered(groupId: string, body: EmailDTO) {
    const users = [];
    for (const email of body.emails) {
      const user = await this.userRepository.create({ email });
      await this.studentRepository.create({
        userId: user.id,
        groupId: groupId,
        state: State.APPROVED,
      });
      users.push({
        id: user.id,
        email: user.email,
      });
    }
    return { users };
  }

  async verifyStudent(groupId: string, userId: string, data: ApproveDTO) {
    const user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    const verifiedStudent = await this.studentRepository.update(user.id, data);
    return this.userService.getStudent(verifiedStudent);
  }

  async moderatorSwitch(groupId: string, userId: string, body: RoleDTO){
    const user = await this.userRepository.get(userId);

    if (body.roleName !== RoleName.MODERATOR && body.roleName === RoleName.STUDENT) {
      throw new NoPermissionException();
    }
    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    const roles = await this.groupRepository.getRoles(groupId);
    const role = roles.find((r) => r.name === body.roleName);
    const userRole = await this.userService.getGroupRoleDB(userId);

    await this.studentRepository.removeRole(userId, userRole.id);
    await this.studentRepository.addRole(userId, role.id);
  }

  async removeStudent(groupId: string, userId: string, reqUser: User) {
    const userRole = await this.userService.getGroupRoleDB(userId);
    const reqUserRole = await this.userService.getGroupRoleDB(reqUser.id);

    if (reqUserRole.weight <= userRole.weight) {
      throw new NoPermissionException();
    }
    if (userRole.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.update(userId, { state: State.DECLINED });
  }

  async getCaptain(groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);

    const student = students.find(({ roles }) => {
      return roles.some((r) => this.checkRole(RoleName.CAPTAIN, r));
    });

    return student?.user;
  }

  checkRole(name: RoleName, role: { role: Role }) {
    return role.role.name === name;
  }

  async deleteGroup(groupId: string) {
    await this.groupRepository.delete(groupId);
  }

  async getStudents(groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);
    return students
      .filter((st) => st.state === State.APPROVED)
      .map((s) => ({
        ...this.userService.getStudent(s),
        role: this.userService.getGroupRole(s.roles),
      }));
  }

  async updateGroup(groupId: string, body: UpdateGroupDTO){
    return this.groupRepository.updateGroup(groupId, body);
  }

  async getUnverifiedStudents(groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);
    return students
      .filter((s) => s.state === State.PENDING)
      .map((s) => this.userService.getStudent(s));
  }
}