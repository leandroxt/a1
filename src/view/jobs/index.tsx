import React, { FC, ReactElement, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Loading from '../../components/loading';
import JobItem from './job-item';
import JobDetail from './job-detail';
import { Job } from './types';
import './index.css';

import useReducer from '../../state';
import { toggleJobDetail, setSelectedJob, fetchJobs, toggleLoading } from '../../state/action';
import { jobs } from '../../state/selector';

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
