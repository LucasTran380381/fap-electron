import {ScheduleDay} from "./schedule-day";

export class ScheduleWeek {
  startDay = new Date();
  endDay = new Date();
  session = 0;
  scheduleDays: ScheduleDay[] = []
}
