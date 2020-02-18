import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './footer.css';

const Footer = () => (
  <div className={style.footer}>
    Нажимая «Записаться», я выражаю своё согласие с обработкой моих персональных данных&nbsp;в&nbsp;соответствии с
    принятой <NavLink className={style.link} to='/'>политикой конфиденциальности</NavLink> и
    принимаю <NavLink className={style.link} to='/'>пользовательское&nbsp;соглашение</NavLink>
  </div>
);

export default Footer;
