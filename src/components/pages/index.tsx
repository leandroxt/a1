import React, { FC, ReactElement, MouseEvent } from 'react';
import './index.css';

interface IProps {
  page: number;
  pages: Array<number>;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Pages: FC<IProps> = ({ page, pages, onClick }: IProps): ReactElement<IProps> => {
  return (
    <div className="pagination">
      {pages.map(p => (
        <button key={p} id={p.toString()} className={`${p === page ? 'active' : ''}`} onClick={onClick}>{p}</button>
      ))}
    </div>
  );
}

export default Pages;
