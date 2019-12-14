import React, { FC, ReactElement, ReactChildren, ReactNode, ReactNodeArray, ReactChild, ReactFragment } from 'react';
import './index.css';

interface IProps {
  loading: boolean;
  children: ReactElement
  | ReactChildren
  | ReactNode
  | ReactNodeArray
  | ReactChild
  | ReactFragment
  | {};
}

const Loading: FC<IProps> = ({ loading, children }: IProps): ReactElement<IProps> => {
  if (loading) {
    return (
      <div className="loading">
        <div className="loader" />
      </div>
    );
  }

  return <>{children}</>;
}

export default Loading;
