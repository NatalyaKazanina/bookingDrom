import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Input = ({ className, name, onChange, onBlur, value, invalid, invalidStyle }) => (
  <Fragment>
    <input
      className={className}
      name={name}
      placeholder="Ваше имя"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
    {invalid && <div className={invalidStyle}>Пожалуйста, укажите имя</div>}
  </Fragment>
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  invalid: PropTypes.bool,
  invalidStyle: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  name: '',
  onChange: () => {},
  onBlur: () => {},
  value: '',
  invalid: false,
  invalidStyle: '',
};

export default Input;
