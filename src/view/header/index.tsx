import React, { FC, ReactElement } from 'react';
import logo from '../../assets/logo.png';
import './index.css';

const Header: FC = (): ReactElement => (
  <div className="header">
    <div className="container">
      <img src={logo} className="logo" alt="site logo" />
      <label>Your next challange is here</label>
    </div>
  </div>
);

export default Header;
