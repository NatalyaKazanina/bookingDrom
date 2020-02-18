import React from 'react';
import PropTypes from 'prop-types';

import style from './head.css';

const Head = ({ title, loading }) => (
  <div className={style.head}>
    {loading && <div className={style.loader} />}
    <div className={style.logo}/>
    <div className={style.title}>{title}</div>
  </div>
);

Head.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
};

Head.defaultProps = {
  title: '',
  loading: false,
};

export default Head;
