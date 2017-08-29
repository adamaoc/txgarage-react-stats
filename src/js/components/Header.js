import React from 'react';
import Logo from './helpers/Logo';

const Header = () => {
  return (
    <nav className="txG-header-nav">
      <div className="txG-header-nav__logo">
        <a href="/" className="logo--wrap">
          <span>STATS</span>
          <span>
            <img src="http://txgarage.com/images/2017/02/txg-logo-500x1201.png" alt="txGarage" />
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Header;
