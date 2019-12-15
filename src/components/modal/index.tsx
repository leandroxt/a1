import React, { FC, ReactElement, MouseEvent } from 'react';
import './index.css';

import { classnames } from '../../utils';

interface IProps {
  isOpen: boolean;
  close: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Modal: FC<IProps> = ({ isOpen, close, children }): ReactElement<IProps> => {
  const cssClass = classnames({
    modal: true,
    open: isOpen
  });

  return (
    <div className={cssClass}>

      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={close}>&times;</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Modal;
