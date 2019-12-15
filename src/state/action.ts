import { Job } from '../view/jobs/types';
import { DispatchType, CONSTANTS } from './types';

export function toggleLoading(): (dispatch: DispatchType) => void {
  return function (dispatch: DispatchType) {
    dispatch({ type: CONSTANTS.TOGGLE_LOADING });
  }
}

export function fetchJobs(jobs: Array<Job>): (dispatch: DispatchType) => void {
  return function (dispatch: DispatchType) {
    dispatch({ type: CONSTANTS.SET_JOBS, payload: { jobs, loading: false } });
  }
}

export function setSelectedJob(job: Job): (dispatch: DispatchType) => void {
  return function (dispatch: DispatchType) {
    dispatch({ type: CONSTANTS.SET_SELECTED_JOB, payload: job });
  }
}

export function toggleJobDetail(): (dispatch: DispatchType) => void {
  return function (dispatch: DispatchType) {
    dispatch({ type: CONSTANTS.TOGGLE_JOB_DETAIL });
  }
}

export function GoToPage(page: number): (dispatch: DispatchType) => void {
  return function (dispatch: DispatchType) {
    dispatch({ type: CONSTANTS.GO_TO_PAGE, payload: page });
  }
}
