import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService {
  constructor() {}


  async parse(parserType, page) {
    // TODO: create method that applies page parser by parserType (see rozParser, scheduleParser)
  }

  async getSchedule(group, fortnight, callback) {
    // TODO: implement method that returns all lessons (static or temporary) depending on
    //       group id and fortnight number (see body in Wiki)
  }

  async getFullStaticLesson(id, fortnight) {
    // TODO: add method that returns full static lesson depending on lesson id and fortnight number (see Wiki)
  };

  async getFullTemporaryLesson(id) {
    // TODO: add method that returns full temporary lesson depending on lesson id and fortnight number (see Wiki)
  }

  async updateFortnightInfo(id, fortnight, data) {
    // TODO: create method that updates fortnight lesson info dpending on lesson id and fortnight number (see Wiki)
  }

  async updateSemesterInfo(id, body) {
    // TODO: create method that updates semester lesson info dpending on lesson id (see Wiki)
  }

  async createLesson(lesson) {
    // TODO: implement method that creates temporary or semester lesson and returns it
  }
}
