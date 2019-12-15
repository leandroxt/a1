import { Job } from '../view/jobs/types';

export const CONSTANTS: {
  GO_TO_PAGE: string;
  TOGGLE_JOB_DETAIL: string;
  SET_SELECTED_JOB: string;
  SET_JOBS: string;
  TOGGLE_LOADING: string;
} = {
  GO_TO_PAGE: 'GO_TO_PAGE',
  TOGGLE_JOB_DETAIL: 'TOGGLE_JOB_DETAIL',
  SET_SELECTED_JOB: 'SET_SELECTED_JOB',
  SET_JOBS: 'SET_JOBS',
  TOGGLE_LOADING: 'TOGGLE_LOADING'
}

export type State = {
  loading: boolean;
  isOpenJobDetail: boolean;
  selectedJob: Job | null;
  page: number;
  jobs: Array<Job>
};

export type Action = {
  type: string;
  payload?: any;
}

export type DispatchType = (action: Action) => void;

