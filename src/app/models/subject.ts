import {SubjectWeek} from "./subject-week";

export class Subject {
  SubjectCode: string = '';
  GroupName: string = '';
  Date: Date = new Date();
  Slot: string = '';
  SlotTime: string = '';
  RoomNo = 0;
  SessionNo = 0;
  Lecturer = '';
  AttendanceStatus = '';
  MeetURL = '';
  Material = '';
  subjectWeek: SubjectWeek = new SubjectWeek();
}
