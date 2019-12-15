import React, { FC, ReactElement, useState, ChangeEvent, FormEvent } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import marked from 'marked';

import Modal from '../../../components/modal';
import Loading from '../../../components/loading';
import Toast from '../../../components/toast';
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

const SUBSCRIBE = gql`
  mutation Subscribe($input: SubscribeInput!) {
    subscribe(input: $input) {
      name
      email
      subscribe
      createdAt
      updatedAt
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

interface FormType {
  name?: string;
  email?: string;
}

const JobDetail: FC<IProps> = ({ isOpen, close, jobSlug, companySlug }: IProps): ReactElement<IProps> => {
  const [form, setForm] = useState<FormType>({ name: '', email: '' });
  function setFormValue({ currentTarget: { id, value } }: ChangeEvent<HTMLInputElement>) {
    setForm((ps) => ({ ...ps, [id]: value }));
  }

  const { loading, data } = useQuery(QUERY, {
    variables: { input: { jobSlug, companySlug } },
  });

  const [showToast, setShow] = useState<boolean>(false);
  const [toastMessage, setMessage] = useState<string>('');
  const [toastError, setToastError] = useState<boolean>(false);
  const [requestingSubscription, setRequestSubscription] = useState<boolean>(false);
  const [subscribe] = useMutation(SUBSCRIBE, {
    onCompleted: () => {
      setForm(() => ({ name: '', email: '' }));
      setToastError(() => false);
      setMessage(() => 'Subscrição feita com sucesso');
      setShow(() => true);
      setRequestSubscription(() => false);
    },
    onError: () => {
      setToastError(() => true);
      setMessage(() => 'Erro ao fazer subscrição. Tente novamente.');
      setShow(() => true);
      setRequestSubscription(() => false);
    }
  });
  function onSubmitSubscription(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRequestSubscription(() => true);
    subscribe({
      variables: {
        input: {
          name: form.name,
          email: form.email
        }
      }
    })
  }

  return (
    <Modal isOpen={isOpen} close={close}>
      <Loading loading={loading}>
        {showToast && <Toast time={5000} message={toastMessage} error={toastError} />}
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

            <div className="subscribe-form">
              <form onSubmit={onSubmitSubscription}>
                <div className="info">
                  <strong>Nome:</strong>
                  <input id="name" type="text" value={form.name} onChange={setFormValue} />
                </div>

                <div className="info">
                  <strong>E-mail:</strong>
                  <input id="email" type="text" value={form.email} onChange={setFormValue} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={requestingSubscription}>Confirmar candidatura</button>
              </form>
            </div>

            <div className="apply">
              <button className="btn mt" onClick={close}>Cancelar</button>
            </div>
          </div>
        </div>
      </Loading>
    </Modal>
  );
}

export default JobDetail;
