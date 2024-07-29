import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { LocalDateTime } from '@js-joda/core';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('확인되지 않은 일정을 추가한다', () => {
    // given
    const startTime = LocalDateTime.of(2024, 1, 1, 14, 0);
    const endTime = LocalDateTime.of(2024, 1, 1, 15, 0);

    // when
    const sut = service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime,
    });

    // then
    expect(sut).toEqual({
      patientId: 1,
      startTime,
      endTime,
      confirmed: false,
    });
  });

  it('종료시간이 시작시간 보다 빠르면 에러가 발생한다', () => {
    // given
    const startTime = LocalDateTime.of(2024, 1, 1, 14, 0);
    const endTime = LocalDateTime.of(2024, 1, 1, 13, 0);

    // when

    // then
    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrow('약속 종료시간은 시작시간 이후여야 한다');
  });

  it('시작시간과 종료시간이 같으면 에러가 발생한다', () => {
    // given
    const startTime = LocalDateTime.of(2024, 1, 1, 14, 0);
    const endTime = startTime;

    // when

    // then
    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrow('약속 종료시간은 시작시간 이후여야 한다');
  });

  it('종료날짜가 다르면 에러가 발생한다', () => {
    // given
    const startTime = LocalDateTime.of(2024, 1, 1, 14, 0);
    const endTime = LocalDateTime.of(2024, 1, 2, 0, 0);

    // when

    // then
    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrow('약속은 같은 날에 시작하고 종료되어야 한다');
  });

  it('약속은 같은 날에 잡히지 않으면 에러가 발생한다', () => {
    // given
    const startTime = LocalDateTime.of(2024, 1, 1, 14, 0);
    const endTime = LocalDateTime.of(2025, 1, 1, 14, 0);

    // when

    // then
    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrow('약속은 같은 날에 시작하고 종료되어야 한다');
  });
});
