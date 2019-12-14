import React, { FC, ReactElement, MouseEvent } from 'react';
import './index.css';

interface IProps {
  isOpen: boolean;
  close: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface IClassNames {
  [key: string]: boolean;
}

function classnames(classes: IClassNames): string {
  return Object.keys(classes)
    .filter((key: string): boolean => classes[key])
    .reduce((accu: string, curr: string): string => `${accu} ${curr}`, '');
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
