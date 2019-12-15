import React from 'react';
import { State, Action, CONSTANTS } from './types';

const initialState: State = {
  jobs: [],
  loading: false,
  isOpenJobDetail: false,
  page: 1,
  selectedJob: null
}

function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case CONSTANTS.SET_JOBS: {
      const { jobs, loading } = payload;
      return { ...state, jobs, loading };
    }

    case CONSTANTS.TOGGLE_JOB_DETAIL: {
      const { isOpenJobDetail } = state;
      return { ...state, isOpenJobDetail: !isOpenJobDetail };
    }

    case CONSTANTS.SET_SELECTED_JOB: {
      return { ...state, selectedJob: payload }
    }

    case CONSTANTS.TOGGLE_LOADING: {
      const { loading } = state;
      return { ...state, loading: !loading };
    }

    case CONSTANTS.GO_TO_PAGE: {
      return { ...state, page: payload };
    }

    default:
      return { ...state };
  }
}

export default function () {
  return React.useReducer(reducer, initialState);
}
