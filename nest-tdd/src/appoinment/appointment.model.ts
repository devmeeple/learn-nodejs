import { LocalDateTime } from '@js-joda/core';

export interface Appointment {
  patientId: number;
  startTime: LocalDateTime;
  endTime: LocalDateTime;
  confirmed: boolean;
}
