import { useEffect } from 'react';
import { AxiosError } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { create } from 'zustand';

import {
  LOCAL_STORAGE_SCHEDULE_KEY,
  MAX_WEEK_NUMBER,
} from '@/components/pages/schedule-page/constants';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import ScheduleAPI from '@/lib/api/schedule/ScheduleAPI';
import { GetEventBody } from '@/lib/api/schedule/types/GetEventBody';
import { getCurrentWeek } from '@/store/schedule/utils/getCurrentWeek';
import { getFirstDayOfAWeek } from '@/store/schedule/utils/getFirstDayOfAWeek';
import { getWeekByDate } from '@/store/schedule/utils/getWeekByDate';
import { Group } from '@/types/group';
import { Event, TDiscipline } from '@/types/schedule';

import { findFirstOf5 } from './utils/findFirstOf5';
import { setUrlParams } from './utils/setUrlParams';

const WEEKS_ARRAY_SIZE = 24;

export interface Checkboxes extends Record<string, boolean | undefined> {
  addLecture: boolean;
  addLaboratory: boolean;
  addPractice: boolean;
  otherEvents: boolean;
  isSelective?: boolean;
}

const checkboxesInitialValues: Checkboxes = {
  addLecture: true,
  addLaboratory: true,
  addPractice: true,
  otherEvents: true,
  isSelective: true,
};

const checkboxesInitialValuesNotAuth: Checkboxes = {
  addLecture: true,
  addLaboratory: true,
  addPractice: true,
  otherEvents: false,
  isSelective: false,
};

const CheckboxesMapper: Record<string, (TDiscipline | null)[]> = {
  addLecture: [TDiscipline.LECTURE],
  addLaboratory: [TDiscipline.LABORATORY],
  addPractice: [TDiscipline.PRACTICE],
  otherEvents: [
    TDiscipline.CONSULTATION,
    TDiscipline.EXAM,
    TDiscipline.WORKOUT,
    null,
  ],
};

type State = {
  checkboxes: Checkboxes;
  semester?: GetCurrentSemester;
  disciplineTypes: (TDiscipline | null)[];
  week: number;
  groupId: string;
  eventsBody: GetEventBody[];
  isNewEventAdded: boolean;
  openedEvent?: Event;
  currentTime: Dayjs;
  chosenDay: Dayjs | null;
  isLoading: boolean;
  error: null | AxiosError;
  isUsingSelective: boolean;
};

type Action = {
  loadNext5Auth: (week: number) => Promise<void>;
  setWeek: (week: number) => void;
  useSetGroupId: () => (id: string) => void;
  handleWeekChange: () => Promise<void>;

  setIsNewEventAdded: (isAdded: boolean) => void;
  setDate: (newDate: Dayjs) => void;
  setChosenDay: (newDate: Dayjs) => void;
  loadNext5: (startWeek: number) => Promise<void>;
  setError: (_: AxiosError | null) => void;
  updateCheckboxes: (checkboxes: Checkboxes) => void;
  useInitialise: (semester: GetCurrentSemester | null, groups: Group[]) => void;
};

export const useSchedule = create<State & Action>((set, get) => {
  return {
    openedEvent: undefined,
    checkboxes: checkboxesInitialValues,
    error: null,
    isLoading: false,
    currentTime: dayjs().tz(),
    isNewEventAdded: false,
    disciplineTypes: [
      TDiscipline.LECTURE,
      TDiscipline.PRACTICE,
      TDiscipline.LABORATORY,
      TDiscipline.EXAM,
      TDiscipline.CONSULTATION,
      TDiscipline.WORKOUT,
      null,
    ],
    week: 1,
    groupId: '',
    eventsBody: new Array(WEEKS_ARRAY_SIZE),
    chosenDay: null,
    semester: undefined,
    isUsingSelective: false,

    handleWeekChange: async () => {
      get().setError(null);

      const week = get().week;
      const eventBodies = get().eventsBody;
      const startWeek = findFirstOf5(week);

      if (!eventBodies[startWeek])
        get().isUsingSelective
          ? await get().loadNext5Auth(startWeek)
          : await get().loadNext5(startWeek);
    },
    loadNext5Auth: async (week: number) => {
      set(state => ({ isLoading: true }));
      const selective = !!get().checkboxes.isSelective;

      try {
        const [r1, r2, r3, r4, r5] = await Promise.all([
          ScheduleAPI.getEventsAuthorized(get().groupId, week, selective),
          ScheduleAPI.getEventsAuthorized(get().groupId, week + 1, selective),
          ScheduleAPI.getEventsAuthorized(get().groupId, week + 2, selective),
          ScheduleAPI.getEventsAuthorized(get().groupId, week + 3, selective),
          ScheduleAPI.getEventsAuthorized(get().groupId, week + 4, selective),
        ]);

        const eventsBody = [...get().eventsBody];

        eventsBody[week - 1] = r1;
        eventsBody[week] = r2;
        eventsBody[week + 1] = r3;
        eventsBody[week + 2] = r4;
        eventsBody[week + 3] = r5;

        set(_ => ({ eventsBody: eventsBody, isLoading: false }));
      } catch (error) {
        set(state => ({ isLoading: false }));
        get().setError(error as AxiosError);
      }
    },
    loadNext5: async (startWeek: number) => {
      set(state => ({ isLoading: true }));

      try {
        const [r1, r2, r3, r4, r5] = await Promise.all([
          ScheduleAPI.getEvents(get().groupId, startWeek),
          ScheduleAPI.getEvents(get().groupId, startWeek + 1),
          ScheduleAPI.getEvents(get().groupId, startWeek + 2),
          ScheduleAPI.getEvents(get().groupId, startWeek + 3),
          ScheduleAPI.getEvents(get().groupId, startWeek + 4),
        ]);

        const eventsBody = [...get().eventsBody];

        eventsBody[startWeek - 1] = r1;
        eventsBody[startWeek] = r2;
        eventsBody[startWeek + 1] = r3;
        eventsBody[startWeek + 2] = r4;
        eventsBody[startWeek + 3] = r5;

        set(_ => ({ eventsBody: eventsBody, isLoading: false }));
      } catch (error) {
        set(state => ({ isLoading: false }));
        get().setError(error as AxiosError);
      }
    },

    updateCheckboxes(checkboxes) {
      const _disciplineTypes: (TDiscipline | null)[] = [];

      for (const [key, value] of Object.entries(checkboxes)) {
        if (value && key !== 'isSelective') {
          _disciplineTypes.push(...CheckboxesMapper[key]);
        }
      }

      const selectiveChanged =
        get().checkboxes.isSelective !== checkboxes.isSelective;

      set(_ => ({
        checkboxes,
        disciplineTypes: _disciplineTypes,
      }));

      if (selectiveChanged) {
        set(_ => ({
          eventsBody: [],
        }));
        get().handleWeekChange();
      }
    },
    setWeek(_week: number) {
      set(_ => ({
        week: _week,
      }));
      setUrlParams('week', _week.toString());

      get().handleWeekChange();
    },
    setError: (_error: AxiosError | null) => {
      set(_ => ({
        error: _error,
      }));
    },
    useSetGroupId() {
      const { user } = useAuthentication();
      return function useSetGroupId(id: string) {
        set(_ => ({
          groupId: id,
          eventsBody: [],
        }));

        const isUsingSelective = user && user.group?.id === id;
        set(state => ({ isUsingSelective }));
        setUrlParams('group', id);

        get().handleWeekChange();
      };
    },
    setIsNewEventAdded(isAdded: boolean) {
      set(_ => ({
        isNewEventAdded: isAdded,
      }));
    },
    setDate(newDate: Dayjs) {
      set(_ => ({
        currentTime: newDate,
      }));
    },
    setChosenDay(newDate: Dayjs) {
      set(_ => ({
        chosenDay: newDate,
      }));
      get().setWeek(
        getWeekByDate(get().semester as GetCurrentSemester, newDate),
      );
    },
    useInitialise(semester, groups) {
      const { user } = useAuthentication();
      const router = useRouter();
      const toast = useToast();

      useEffect(() => {
        const interval = setInterval(() => {
          get().setDate(dayjs().tz());
        }, 1000 * 60);

        return () => clearInterval(interval);
      });

      useEffect(() => {
        if (!router.isReady || !semester) return;
        useSchedule.setState(state => ({ semester: semester }));

        const { group: urlGroup, week: urlWeek } = router.query;
        const isGroupValid = groups.some(_group => _group.id === urlGroup);
        const isWeekValid =
          urlWeek && +urlWeek > 0 && +urlWeek < MAX_WEEK_NUMBER;

        const week = isWeekValid
          ? +urlWeek
          : Math.min(getCurrentWeek(semester), MAX_WEEK_NUMBER);

        if (!isGroupValid) {
          const storageGroup = localStorage.getItem(LOCAL_STORAGE_SCHEDULE_KEY);
          if (!storageGroup) router.push('/schedule');

          if (storageGroup) {
            set(state => ({ groupId: storageGroup }));
            router.push(`/schedule?group=${storageGroup}`);
          } else toast.info('Оберіть групу');
        } else set(state => ({ groupId: urlGroup as string }));

        const isUsingSelective = user && user.group?.id === get().groupId;
        set(state => ({
          isUsingSelective,
          checkboxes: isUsingSelective
            ? checkboxesInitialValues
            : checkboxesInitialValuesNotAuth,
        }));

        get().setChosenDay(
            getFirstDayOfAWeek(get().semester as GetCurrentSemester, week),
        );
      }, [router.isReady]);
    },
  };
});
