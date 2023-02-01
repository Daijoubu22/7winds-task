import React from 'react';
import { ReactComponent as OptionsIcon } from '@images/svg/options.svg';
import { ReactComponent as ShareIcon } from '@images/svg/share.svg';
import './Header.style.scss';

function Header() {
  return (
    <header className="header">
      <nav className="header__navigation">
        <a href="#" className="header__icon-link"><OptionsIcon /></a>
        <a href="#" className="header__icon-link"><ShareIcon /></a>
        <a href="#" className="header__link header__link--active">Просмотр</a>
        <a href="#" className="header__link">Управление</a>
      </nav>
    </header>
  );
}

export default Header;
