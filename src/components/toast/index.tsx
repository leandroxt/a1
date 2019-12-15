import React, { FC, ReactElement, useState } from 'react';
import './index.css';

import { classnames } from '../../utils';

interface IProps {
  time: number;
  message: string;
  error: boolean;
}

const Toast: FC<IProps> = ({ time, message, error }: IProps): ReactElement<IProps> => {
  const [show, setShow] = useState<boolean>(true);

  setTimeout(() => {
    setShow(() => false);
  }, time);

  const css = classnames({
    snackbar: true,
    show: show,
    error
  });

  return (
    <div className={css}>{message}</div>
  );
}

export default Toast;
