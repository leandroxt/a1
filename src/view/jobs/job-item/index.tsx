import React, { FC, ReactElement } from 'react';
import { Job } from '../types';
import './index.css';

interface IProps {
  job: Job;
  openDetail: (job: Job) => void;
}

function onClick(job: Job, fn: (job: Job) => void): () => void {
  return () => fn(job);
}

const JobItem: FC<IProps> = ({ job, openDetail }: IProps): ReactElement<IProps> => (
  <>
    <div className="job-item">
      <div className="job-title">
        <label className="title">{job.title}</label>
        <label className="company">{job.company.name}</label>
      </div>
      <button className="btn btn-sm" onClick={onClick(job, openDetail)}>Ver detalhes</button>
    </div>
  </>
);


export default JobItem;
