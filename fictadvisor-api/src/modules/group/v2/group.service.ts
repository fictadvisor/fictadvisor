import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  ApproveDTO,
  CreateGroupDTO,
  EmailDTO,
  GroupStudentsQueryDTO,
  QueryAllGroupsDTO,
  QuerySemesterDTO,
  SortDTO,
  UpdateGroupDTO,
  OrdinaryStudentResponse,
  OrderQAParam,
  SortQAGroupsParam,
  SortQGSParam,
  Sort,
  SelectiveDisciplinesWithAmountResponse,
} from '@fictadvisor/utils';
import { UserService } from '../../user/v2/user.service';
import { FileService } from '../../file/file.service';
import { DateService } from '../../date/v2/date.service';
import { Prisma, RoleName, State, User } from '@prisma-client/fictadvisor';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { DbGroup, DbGroupWithCathedra, DbGroupWithStudents } from '../../../database/v2/entities/group.entity';
import { StudentWithContactsData } from '../../file/types/student-with-contacts.data';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { DbStudent } from '../../../database/v2/entities/student.entity';
import { DbBaseUser, DbUser } from '../../../database/v2/entities/user.entity';
import { GroupRepository } from '../../../database/v2/repositories/group.repository';
import { StudentRepository } from '../../../database/v2/repositories/student.repository';
import { DisciplineRepository } from '../../../database/v2/repositories/discipline.repository';
import { UserRepository } from '../../../database/v2/repositories/user.repository';
import { RoleRepository } from '../../../database/v2/repositories/role.repository';
import { GrantRepository } from '../../../database/v2/repositories/grant.repository';
import { AlreadyExistException } from '../../../common/exceptions/already-exist.exception';
import { AlreadyRegisteredException } from '../../../common/exceptions/already-registered.exception';
import { NoPermissionException } from '../../../common/exceptions/no-permission.exception';
import { InvalidEntityIdException } from '../../../common/exceptions/invalid-entity-id.exception';
import { StudentIsAlreadyCaptainException } from '../../../common/exceptions/student-is-already-captain.exception';
import { NotApprovedException } from '../../../common/exceptions/not-approved.exception';
import { AbsenceOfCaptainException } from '../../../common/exceptions/absence-of-captain.exception';
import { CaptainCanNotLeaveException } from '../../../common/exceptions/captain-can-not-leave.exception';
import { AVATARS } from '../../auth/v2/auth.service';
import { PaginatedData } from '../../../database/types/paginated.data';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { isUniqueViolation } from '../../../common/utils/prisma-error.util';
import {
  getAdmissionYearFromCode,
  getStudyYears,
  isGraduatedCode,
  toGraduatedCode,
  LEVEL_MARKERS,
  POSTGRADUATE_LEVEL,
  STUDY_YEARS_BY_LEVEL,
} from '../../../common/utils/group-code.util';

interface GraduableGroup {
  code: string;
  admissionYear: number;
}


const LAST_SEMESTER = 2;

const LEAVE_SUFFIX = '.leave';
const LEAVE_PERMISSION = `groups.$groupId${LEAVE_SUFFIX}`;

const ROLE_LIST = [
  {
    name: RoleName.CAPTAIN,
    weight: 100,
    grants: {
      // Denied while the group is still studying: the captain has to hand the
      // role over first. Reopened for graduated groups by `openLeaveForGraduatedGroups`.
      [LEAVE_PERMISSION]: { set: false, weight: 2 },
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
  {
    name: RoleName.MODERATOR,
    weight: 75,
    grants: {
      'groups.$groupId.admin.switch': { set: false, weight: 2 },
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
  {
    name: RoleName.STUDENT,
    weight: 50,
    grants: {
      'groups.$groupId.events.create': { set: false, weight: 5 },
      'groups.$groupId.events.update': { set: false, weight: 5 },
      'groups.$groupId.events.delete': { set: false, weight: 5 },
      'groups.$groupId.admin.switch': { set: false, weight: 2 },
      'groups.$groupId.students.get': { set: true, weight: 4 },
      'groups.$groupId.students.*': { set: false, weight: 3 },
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
];

@Injectable()
export class GroupService {
  constructor (
    private groupRepository: GroupRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private grantRepository: GrantRepository,
    private disciplineRepository: DisciplineRepository,
    private dateService: DateService,
    private fileService: FileService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create ({ code, eduProgramId, cathedraId, admissionYear }: CreateGroupDTO): Promise<DbGroup>  {
    // Codes are unique in the database, so a duplicate is the caller's mistake and
    // deserves a 400 rather than the 500 a bare P2002 would surface as.
    const group = await this.createGroup({
      code,
      cathedraId,
      educationalProgramId: eduProgramId,
      admissionYear: admissionYear ?? getAdmissionYearFromCode(code),
    }, () => {
      throw new AlreadyExistException('Group');
    });

    await this.addPermissions(group.id);
    return group;
  }

  // `onTakenCode` decides what a code collision means to the caller: a mistake
  // worth rejecting, or a race whose winner should simply be read back.
  private async createGroup (
    data: Prisma.GroupUncheckedCreateInput,
    onTakenCode: () => Promise<DbGroup> | never,
  ): Promise<DbGroup> {
    try {
      return await this.groupRepository.create(data);
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      return await onTakenCode();
    }
  }

  async getOrCreate (
    { code, eduProgramId, cathedraId, admissionYear }:
    Omit<UpdateGroupDTO, 'code'> & { code: string },
  ): Promise<DbGroup>  {
    const group =
      await this.groupRepository.findOne({ code }) ??
      // Two parses running at once both miss the lookup and both insert. The one
      // that loses the race reads back what the other wrote rather than failing.
      await this.createGroup({
        code,
        cathedraId,
        educationalProgramId: eduProgramId,
        admissionYear: admissionYear ?? getAdmissionYearFromCode(code),
      }, () => this.groupRepository.findOne({ code }));

    // By id rather than by code: the group we hold is the one that needs its
    // permissions, whoever created it.
    const permissionsCount = await this.roleRepository.count({
      groupRole: {
        groupId: group.id,
      },
    });

    if (permissionsCount === 0) {
      await this.addPermissions(group.id);
    }
    return group;
  }

  async getAll (query: QueryAllGroupsDTO): Promise<PaginatedData<DbGroupWithStudents>> {
    if (query.sort === SortQAGroupsParam.CAPTAIN) {
      return this.getAllByCaptain(query);
    }

    const data: PaginateArgs<'group'> = {
      where: {
        AND: [
          this.GroupSearching.code(query.search),
          this.GroupSearching.specialities(query.specialities),
          this.GroupSearching.cathedras(query.cathedras),
          this.GroupSearching.courses(query.courses),
          await this.notGraduated(query.hideGraduated),
        ],
      },
      ...this.getGroupSorting(query),
    };
    return PaginationUtil.paginate<'group', DbGroup>(this.groupRepository, query, data);
  }

  private async getAllByCaptain (query: QueryAllGroupsDTO): Promise<PaginatedData<DbGroupWithStudents>> {
    const data: PaginateArgs<'student'> = {
      where: {
        group: {
          AND: [
            this.GroupSearching.code(query.search),
            this.GroupSearching.specialities(query.specialities),
            this.GroupSearching.cathedras(query.cathedras),
            this.GroupSearching.courses(query.courses),
            await this.notGraduated(query.hideGraduated),
          ],
        },
        roles: {
          some: {
            role: {
              name: RoleName.CAPTAIN,
            },
          },
        },
      },
      orderBy: {
        lastName: query.order ?? 'asc',
      },
    };

    const captains = await PaginationUtil.paginate<'student', DbStudent>(this.studentRepository, query, data);
    // A captain always has a group here — the query filters on it.
    const groups = captains.data.map(({ group, ...captain }) => ({
      ...group as DbGroupWithCathedra,
      students: [captain],
    }));

    return {
      data: groups,
      pagination: captains.pagination,
    };
  }

  private GroupSearching = {
    code: (search?: string) => DatabaseUtils.getSearch({ search }, 'code'),
    specialities: (specialities?: string[]) => {
      if (!specialities?.length) return {};
      return {
        educationalProgram: {
          speciality: {
            id: {
              in: specialities,
            },
          },
        },
      };
    },
    cathedras: (cathedras?: string[]) => {
      if (!cathedras?.length) return {};
      return {
        cathedra: {
          id: {
            in: cathedras,
          },
        },
      };
    },
    courses: (courses?: number[]) => {
      if (!courses?.length) return {};

      const courseDate = new Date();
      courseDate.setMonth(courseDate.getMonth() + 4);
      const courseYear = courseDate.getFullYear();

      return {
        admissionYear: {
          in: courses?.map((course) => courseYear-course),
        },
      };
    },
  };

  private getGroupSorting ({ sort, order }: SortDTO): Sort {
    order = order ?? 'asc';

    if (sort === SortQAGroupsParam.CODE) return { orderBy: [{ code: order }] };
    if (sort === SortQAGroupsParam.ADMISSION) return { orderBy: [{ admissionYear: order }] };
    return { orderBy: [{ code: order }] };
  }

  async get (id: string): Promise<DbGroup> {
    return this.groupRepository.findOne({ id });
  }

  async getDisciplineTeachers (groupId: string, { year, semester }: QuerySemesterDTO): Promise<DbDiscipline[]> {
    this.dateService.checkYearAndSemester(year, semester);
    return this.disciplineRepository.findMany({
      groupId,
      semester,
      year,
    });
  }

  async getSelectiveDisciplines (groupId: string): Promise<DbDiscipline[]> {
    return this.disciplineRepository.findMany(
      {
        groupId,
        isSelective: true,
      },
      undefined,
      undefined,
      [{ year: 'asc' }, { semester: 'asc' }],
    );
  }

  getMappedSelectiveDisciplines (disciplines: DbDiscipline[]): SelectiveDisciplinesWithAmountResponse[] {
    const result: SelectiveDisciplinesWithAmountResponse[] = [];

    disciplines.forEach((discipline) => {
      if (!result.some(({ semester, year }) => semester === discipline.semester && year === discipline.year)) {
        result.push(this.mapper.map(discipline, DbDiscipline, SelectiveDisciplinesWithAmountResponse, {
          extraArgs: () => ({ disciplines }),
        }));
      }
    });

    return result;
  }

  async addUnregistered (groupId: string, body: EmailDTO): Promise<DbUser[]> {
    const users: DbUser[] = [];
    for (const email of body.emails) {
      const user = await this.userRepository.findOne({ email });
      if (user) throw new AlreadyRegisteredException();
    }
    for (const email of body.emails) {
      const user = await this.userRepository.create({
        email,
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      });
      await this.studentRepository.create({
        userId: user.id,
        groupId: groupId,
        state: State.APPROVED,
      });
      await this.addGroupRole(groupId, user.id, RoleName.STUDENT);
      users.push(user);
    }
    return users;
  }

  async verifyStudent (groupId: string, userId: string, data: ApproveDTO): Promise<DbStudent> {
    const verifiedStudent = await this.studentRepository.updateById(userId, { state: data.state });

    if (data.state === State.APPROVED) {
      await this.addGroupRole(groupId, userId, RoleName.STUDENT);
      await this.userService.putSelective(userId);
    }

    return verifiedStudent;
  }

  async addGroupRole (groupId: string, userId: string, name: RoleName): Promise<void> {
    const { id } = await this.roleRepository.findOne({
      groupRole: {
        groupId,
        role: {
          name,
        },
      },
    });
    await this.userService.giveRole(userId, id);
  }

  async removeStudent (groupId: string, userId: string, reqUser: User): Promise<void> {
    const userRole = await this.userService.getGroupRoleDB(userId);
    const reqUserRole = await this.userService.getGroupRoleDB(reqUser.id);

    if (reqUserRole.weight <= userRole.weight) {
      throw new NoPermissionException();
    }
    if (userRole.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.userService.removeRole(
      userId,
      userRole.id,
    );

    const user = await this.userRepository.findOne({ id: userId });

    await this.studentRepository.updateById(userId, { state: State.DECLINED });
    if (!user.username) {
      await this.userRepository.findOne({ id: userId });
    }
  }

  async findCaptain (groupId: string): Promise<DbBaseUser | undefined> {
    const captain = await this.studentRepository.findOne({
      groupId,
      roles: {
        some: {
          role: {
            name: RoleName.CAPTAIN,
          },
        },
      },
    });

    return captain?.user;
  }

  async getCaptain (groupId: string) {
    const captain = await this.findCaptain(groupId);

    if (!captain) {
      throw new AbsenceOfCaptainException();
    }

    return captain;
  }

  async deleteGroup (groupId: string): Promise<DbGroup> {
    await this.roleRepository.delete({ groupRole: { groupId } });
    await this.studentRepository.update({ group: { id: groupId } }, { state: State.DECLINED });
    return this.groupRepository.deleteById(groupId);
  }

  async getStudents (groupId: string, { sort, order }: GroupStudentsQueryDTO): Promise<DbStudent[]> {
    const orderBy: Prisma.StudentOrderByWithRelationInput[] = [];
    if (sort) {
      if (!order) order = OrderQAParam.ASC;
      orderBy.push({ [sort]: order });
      orderBy.push({ [SortQGSParam.LAST_NAME]: order });
      orderBy.push({ [SortQGSParam.FIRST_NAME]: order });
      orderBy.push({ [SortQGSParam.MIDDLE_NAME]: order });
    }

    return this.studentRepository.findMany({
      groupId,
      state: State.APPROVED,
    }, undefined, undefined, orderBy);
  }

  async updateGroup (groupId: string, {
    code,
    eduProgramId,
    cathedraId,
    admissionYear,
    captainId,
    moderatorIds,
  }: UpdateGroupDTO): Promise<DbGroup> {
    if (captainId) {
      await this.switchCaptain(groupId, captainId);
    }

    if (moderatorIds?.length) {
      await this.switchModerators(groupId, moderatorIds);
    }

    try {
      return await this.groupRepository.updateById(groupId, {
        code,
        cathedraId,
        educationalProgramId: eduProgramId,
        admissionYear,
      });
    } catch (error) {
      if (isUniqueViolation(error)) throw new AlreadyExistException('Group');
      throw error;
    }
  }

  async getUnverifiedStudents (groupId: string): Promise<DbStudent[]> {
    return this.studentRepository.findMany({
      groupId,
      state: State.PENDING,
    });
  }

  private async addPermissions (groupId: string): Promise<void> {
    for (const { grants, ...roles } of ROLE_LIST) {

      const grantList = Object.entries(grants).map(([permission, description]) => ({
        permission: permission.replace('$groupId', groupId),
        ...description,
      }));

      await this.roleRepository.create({
        ...roles,
        grants: {
          create: grantList,
        },
        groupRole: {
          create: {
            groupId,
          },
        },
      });
    }
  }

  async switchCaptain (groupId: string, studentId: string): Promise<OrdinaryStudentResponse> {
    const isStudentInGroup = await this.isStudentInGroup(groupId, studentId);
    if (!isStudentInGroup) throw new NoPermissionException();
    const oldCaptain = await this.findCaptain(groupId);

    if (oldCaptain) {
      if (oldCaptain.id === studentId) throw new StudentIsAlreadyCaptainException();
      await this.userService.changeGroupRole(oldCaptain.id, RoleName.STUDENT);
    }

    await this.userService.changeGroupRole(studentId, RoleName.CAPTAIN);
    return this.userService.getUser(studentId);
  }

  async switchModerators (groupId: string, studentIds: string[]): Promise<void> {
    const students = await this.studentRepository.findMany({ groupId });

    const oldModerators = students.filter(
      (student) => student.roles.find(({ role }) => role.name === RoleName.MODERATOR),
    );

    const newModerators = students.filter(
      (student) => studentIds.find((id) => id === student.userId),
    );

    if (newModerators.length !== studentIds.length) {
      throw new InvalidEntityIdException('Student');
    }

    for (const oldModerator of oldModerators) {
      await this.userService.changeGroupRole(oldModerator.userId, RoleName.STUDENT);
    }

    for (const studentId of studentIds) {
      await this.userService.changeGroupRole(studentId, RoleName.MODERATOR);
    }
  }

  private async isStudentInGroup (groupId: string, userId: string): Promise<boolean> {
    const student = await this.studentRepository.findOne({ userId });
    if (!student) throw new InvalidEntityIdException('User');
    return student.groupId === groupId;
  }

  async getGroupsWithTelegramGroups (): Promise<DbGroup[]> {
    return this.groupRepository.findMany({
      telegramGroups: {
        some: {},
      },
    });
  }

  async getGroupList (groupId: string) {
    const dbStudents = await this.studentRepository.findMany({
      groupId,
      state: State.APPROVED,
    }, undefined, undefined, [
      { lastName: 'asc' },
      { firstName: 'asc' },
      { middleName: 'asc' },
    ]);

    const students: StudentWithContactsData[] = [];

    for (const dbStudent of dbStudents) {
      students.push({
        lastName: dbStudent.lastName,
        firstName: dbStudent.firstName,
        middleName: dbStudent.middleName,
        email: dbStudent.user.email,
        contacts: await this.userService.getContacts(dbStudent.userId),
      });
    }

    return this.fileService.generateGroupList(students, groupId);
  }

  async leaveGroup (groupId: string, studentId: string): Promise<DbStudent> {
    const isStudentInGroup = await this.isStudentInGroup(groupId, studentId);
    if (!isStudentInGroup) throw new NoPermissionException();

    const student = await this.studentRepository.findOne({ userId: studentId });
    if (student.state !== State.APPROVED) throw new NotApprovedException();

    // `findCaptain`, not `getCaptain`: a group left without a captain must not
    // trap the rest of its students inside it.
    const captain = await this.findCaptain(groupId);
    if (captain?.id === studentId && !(await this.isGraduated(groupId))) {
      throw new CaptainCanNotLeaveException();
    }

    await this.userService.deleteStudentSelectives(studentId);

    const { id } = await this.userService.getGroupRole(studentId);
    return this.studentRepository.updateById(studentId, {
      state: State.DECLINED,
      roles: {
        deleteMany: [{
          roleId: id,
          studentId,
        }],
      },
    });
  }

  // The most recent admission year that has already graduated off a programme of
  // the given length: a group admitted in year A sits its last academic year in
  // A + studyYears - 1, so it has graduated once that year's second semester is over.
  private async getGraduatedThroughYear (studyYears: number): Promise<number> {
    const { year, semester, isFinished } = await this.dateService.getCurrentSemester();

    return semester === LAST_SEMESTER && isFinished
      ? year - studyYears + 1
      : year - studyYears;
  }

  private async hasGraduated ({ code, admissionYear }: GraduableGroup): Promise<boolean> {
    const studyYears = getStudyYears(code);
    // Аспіранти and codes the grammar does not recognise never graduate here.
    if (!studyYears) return false;

    return admissionYear <= await this.getGraduatedThroughYear(studyYears);
  }

  // Asks the database for the graduated groups directly instead of reading every
  // past cohort and filtering in memory. Built from the very table `hasGraduated`
  // reads, so the query cannot drift away from the check it narrows for — and
  // `hasGraduated` stays the authority, because SQL cannot tell a bachelor code
  // from one the grammar does not recognise at all.
  private async getGraduatedGroupsWhere (): Promise<Prisma.GroupWhereInput> {
    // Bachelors carry no marker, so they are "none of the markers".
    const matchesLevel = (level: string): Prisma.GroupWhereInput => level
      ? { code: { contains: level } }
      : { NOT: { OR: LEVEL_MARKERS.map((marker) => ({ code: { contains: marker } })) } };

    const levelsByYears = new Map<number, string[]>();
    for (const [level, years] of Object.entries(STUDY_YEARS_BY_LEVEL)) {
      levelsByYears.set(years, [...levelsByYears.get(years) ?? [], level]);
    }

    return {
      // Аспіранти never graduate, so they are never worth looking at.
      NOT: { code: { contains: POSTGRADUATE_LEVEL } },
      OR: await Promise.all(
        [...levelsByYears].map(async ([years, levels]) => ({
          OR: levels.map(matchesLevel),
          admissionYear: { lte: await this.getGraduatedThroughYear(years) },
        })),
      ),
    };
  }

  // The plain negation of the query the nightly pass graduates by, so a list of
  // groups that still study is drawn on the same line as the rename that follows
  // graduation. Аспіранти fall on the studying side, as they do everywhere else.
  // The one place this is stricter than `hasGraduated` is a code the grammar
  // rejects: SQL cannot tell one from a bachelor's, so an old one is left out of
  // the list. The pass checks again before renaming because renaming is
  // destructive; leaving a group out of a picker is not, and the database holds
  // no such code.
  private async notGraduated (hideGraduated?: boolean): Promise<Prisma.GroupWhereInput> {
    if (!hideGraduated) return {};
    return { NOT: await this.getGraduatedGroupsWhere() };
  }

  async isGraduated (groupId: string): Promise<boolean> {
    return this.hasGraduated(await this.groupRepository.findOne({ id: groupId }));
  }

  // Graduation is a date, not an event anyone triggers, so everything that has to
  // happen when a group finishes hangs off one nightly pass. A group graduates
  // once, so a few hours of lag costs nothing.
  @Cron('0 30 3 * * *')
  async handleGraduatedGroups (): Promise<void> {
    const groups = await this.groupRepository.findMany(await this.getGraduatedGroupsWhere());

    for (const group of groups) {
      // The query cannot rule out a code the grammar rejects — that is this check.
      if (!await this.hasGraduated(group)) continue;

      // Independent of each other on purpose: a code that cannot be freed must
      // still not keep the captain locked in.
      await this.openLeaveForCaptain(group.id);
      await this.freeGroupCode(group);
    }
  }

  // The captain's `leave` denial is a static grant, so it has to be lifted by hand
  // once the group it guards is over. Only the captain role carries this exact
  // permission, and `set: false` makes a second run a no-op.
  private async openLeaveForCaptain (groupId: string): Promise<void> {
    await this.grantRepository.update({
      permission: `groups.${groupId}${LEAVE_SUFFIX}`,
      set: false,
    }, {
      set: true,
    });
  }

  // Codes come round every ten years — ІМ-31 is the 2023 cohort and will be the
  // 2033 one — so a graduated group has to hand its bare code back before the
  // parser meets the next group wearing it. The admission year is what gets
  // appended, not the graduation year: it is what the code's own digit encodes.
  private async freeGroupCode ({ id, code, admissionYear }: DbGroup): Promise<void> {
    if (isGraduatedCode(code)) return;

    const graduatedCode = toGraduatedCode(code, admissionYear);

    // Merging two cohorts is not this job's call, but staying quiet would be worse
    // than useless: the bare code is never freed, and the cohort ten years from
    // now silently attaches itself to this group through `getOrCreate`. Checked
    // up front for the message, caught as well because the check is not atomic.
    if (await this.groupRepository.exists({ code: graduatedCode })) {
      return this.warnCodeTaken(code, graduatedCode);
    }

    try {
      await this.groupRepository.updateById(id, { code: graduatedCode });
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      this.warnCodeTaken(code, graduatedCode);
    }
  }

  private warnCodeTaken (code: string, graduatedCode: string): void {
    console.warn(
      `Cannot free group code "${code}": "${graduatedCode}" already exists. ` +
      'Merge or rename the duplicate, or the next cohort with this code will reuse the old group.',
    );
  }
}
