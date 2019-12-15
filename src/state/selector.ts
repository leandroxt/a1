import { State } from './types';
import { Job } from '../view/jobs/types';

const ITEMS_PER_PAGE: number = 10;

export function getPages(state: State): Array<number> {
  const lastPage: number = Math.floor(state.jobs.length / ITEMS_PER_PAGE);
  return Array.from(Array(lastPage).keys()).map(n => n + 1)
}

export function jobs(state: State): Array<Job> {
  const jobs: Array<Job> = state.jobs;
  const lastPage: number = Math.floor(jobs.length / ITEMS_PER_PAGE);

  if (state.page > lastPage) {
    return jobs.slice(getPages(state)[jobs.length - 1], ITEMS_PER_PAGE);
  }

  const offset: number = (state.page > 0 ? state.page - 1 : 0) * ITEMS_PER_PAGE;
  const limit: number = offset + ITEMS_PER_PAGE;
  return jobs.slice(offset, limit);
}
