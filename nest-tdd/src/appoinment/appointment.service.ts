import { Injectable } from '@nestjs/common';
import { LocalDateTime } from '@js-joda/core';
import { Appointment } from './appointment.model';

export interface AppointmentInput {
  patientId: number;
  startTime: LocalDateTime;
  endTime: LocalDateTime;
}

@Injectable()
export class AppointmentService {
  scheduleAppointment(appointmentData: AppointmentInput): Appointment {
    if (
      appointmentData.endTime.isBefore(appointmentData.startTime) ||
      appointmentData.endTime.equals(appointmentData.startTime)
    ) {
      throw new Error('약속 종료시간은 시작시간 이후여야 한다');
    }

    if (this.endTimeIsInTheNextDay(appointmentData)) {
      throw new Error('약속은 같은 날에 시작하고 종료되어야 한다');
    }
    return {
      ...appointmentData,
      confirmed: false,
    };
  }

  private endTimeIsInTheNextDay(appointmentData: AppointmentInput) {
    const differentDays =
      appointmentData.startTime.dayOfMonth() !==
      appointmentData.endTime.dayOfMonth();

    const differentMonths =
      appointmentData.startTime.month() !== appointmentData.endTime.month();

    const differentYears =
      appointmentData.startTime.year() !== appointmentData.endTime.year();

    return differentDays || differentMonths || differentYears;
  }
}
