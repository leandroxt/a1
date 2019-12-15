import { State } from './types';
import { Job } from '../view/jobs/types';

const ITEMS_PER_PAGE: number = 10;

export function jobs(state: State): Array<Job> {
  const offset: number = (state.page > 0 ? state.page - 1 : 0) * ITEMS_PER_PAGE;
  const limit: number = offset + ITEMS_PER_PAGE;
  return state.jobs.slice(offset, limit);
}
