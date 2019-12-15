import React, { FC, ReactElement, useEffect, MouseEvent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Loading from '../../components/loading';
import JobItem from './job-item';
import JobDetail from './job-detail';
import Pages from '../../components/pages';
import { Job } from './types';
import './index.css';

import useReducer from '../../state';
import { toggleJobDetail, setSelectedJob, fetchJobs, toggleLoading, GoToPage } from '../../state/action';
import { jobs, getPages } from '../../state/selector';

const QUERY = gql`
  query {
    jobs {
      id
      title
      slug
      tags {
        name
      }
      commitment {
        title
      }
      company {
        name
        slug
      }
    }
  }
`;

interface IProps {
  loading: boolean;
  jobs: Array<Job>;
}

const Jobs: FC = (): ReactElement => {
  const [state, dispatch] = useReducer();

  function _toggleJobDetail() {
    toggleJobDetail()(dispatch)
  }
  function openDetail(job: Job): void {
    setSelectedJob(job)(dispatch);
    _toggleJobDetail();
  }
  function _goToPage(e: MouseEvent<HTMLButtonElement>): void {
    const page = parseInt(e.currentTarget.id);
    GoToPage(page)(dispatch);
  }

  useEffect(() => {
    toggleLoading()(dispatch);
  }, []);

  useQuery<IProps>(QUERY, {
    onCompleted: ({ jobs }) => {
      fetchJobs(jobs)(dispatch);
    }
  });

  return (
    <div className="container">
      <label className="title">Trabalhos abertos</label>
      <Loading loading={state.loading}>
        {jobs(state).map((job: Job) => <JobItem key={job.id} job={job} openDetail={openDetail} />)}
        <Pages page={state.page} pages={getPages(state)} onClick={_goToPage} />
      </Loading>
      {
        state.selectedJob && state.isOpenJobDetail && (
          <JobDetail
            isOpen={state.isOpenJobDetail}
            close={_toggleJobDetail}
            jobSlug={state.selectedJob.slug}
            companySlug={state.selectedJob.company.slug}
          />
        )
      }
    </div>
  );
}

export default Jobs;
