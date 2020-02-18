import React from 'react';
import PropTypes from "prop-types";

import style from './success.css';

const Success = ({ onClick }) => (
  <div className={style.wrapper}>
    <div className={style.body}>
      <div className={style.close} onClick={onClick} />
      <div className={style.text}>Вы успешно записаны!</div>
    </div>
  </div>
);

Success.propTypes = {
  onClick: PropTypes.func,
};

Success.defaultProps = {
  onClick: () => {},
};

export default Success;
