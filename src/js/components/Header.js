import React from 'react';
import Logo from './helpers/Logo';

const Header = () => {
  return (
    <nav className="txG-header-nav">
      <div className="txG-header-nav__logo">
        <a href="/" className="logo--wrap">
          <Logo />
          <span className="logo__text">
            stats.<span>tx</span>Garage
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Header;
