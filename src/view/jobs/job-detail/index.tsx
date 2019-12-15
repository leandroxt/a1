import React, { FC, ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import marked from 'marked';

import Modal from '../../../components/modal';
import Loading from '../../../components/loading';
import './index.css';

const QUERY = gql`
  query getJob($input: JobInput!) {
    job(input: $input) {
      id
      title
      description
      applyUrl
      locationNames
      remotes {
        name
      }
      tags {
        name
      }
      commitment {
        title
      }
      company {
        name
      }
    }
  }
`;

interface IProps {
  jobSlug: string;
  companySlug: string;
  isOpen: boolean;
  close: () => void;
}

function createMarkup(description: string): { __html: string } {
  return { __html: marked(description) };
}

const JobDetail: FC<IProps> = ({ isOpen, close, jobSlug, companySlug }: IProps): ReactElement<IProps> => {
  const { loading, data } = useQuery(QUERY, {
    variables: { input: { jobSlug, companySlug } },
  });

  return (
    <Modal isOpen={isOpen} close={close}>
      <Loading loading={loading}>
        <h1>{data && data.job.title}</h1>

        <div className="content">
          <div className="description" dangerouslySetInnerHTML={data && createMarkup(data.job.description)} />
          <div className="informations">
            <div className="info">
              <strong>Tipo/Horário:</strong>{data && data.job.commitment.title}
            </div>

            <div className="info">
              <strong>Tags</strong>
              <div className="tags">
                {
                  data && data.job.tags.map(({ name }: { name: string }) => (
                    <div key={name} className="tag">{name}</div>
                  ))
                }
              </div>
            </div>

            <div className="info">
              <strong>Local: </strong>{data && data.job.locationNames}
            </div>

            <div className="info">
              <strong>Remoto: </strong>{data && Boolean(data.job.remotes.length) ? 'Sim' : 'Não'}
            </div>

            <div className="info">
              <strong>Empresa: </strong>{data && data.job.company.name}
            </div>

            <div className="apply">
              <button className="btn btn-primary">Aplicar</button>
            </div>
          </div>
        </div>
      </Loading>
    </Modal>
  );
}

export default JobDetail;
