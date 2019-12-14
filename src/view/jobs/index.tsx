import React, { FC, ReactElement, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Loading from '../../components/loading';
import JobItem from './job-item';
import JobDetail from './job-detail';
import { Job } from './types';
import './index.css';

interface IProps {
  loading: boolean;
  jobs: Array<Job>;
}

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

const Jobs: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  function toggleIsOpen(): void { setIsOpen((ps) => !ps); }
  function openDetail(job: Job): void {
    setSelectedJob(() => job);
    toggleIsOpen();
  }

  const { loading, data } = useQuery<IProps>(QUERY);

  return (
    <div className="container">
      <label className="title">Trabalhos abertos</label>
      <Loading loading={loading}>
        {data && data.jobs.map((job: Job) => <JobItem key={job.id} job={job} openDetail={openDetail} />)}
      </Loading>
      {
        selectedJob && isOpen && (
          <JobDetail
            isOpen={isOpen}
            close={toggleIsOpen}
            jobSlug={selectedJob.slug}
            companySlug={selectedJob.company.slug}
          />
        )
      }
    </div>
  );
}

export default Jobs;
