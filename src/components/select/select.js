import React from 'react';
import PropTypes from 'prop-types';

import style from './select.css';

const Select = ({ className, defaultValue, name, onChange, onBlur, data, value, invalid, invalidStyle, disabled }) => (
  
  <div className={style.wrapper}>
    <select
      className={defaultValue === value ? className + ' ' + style.placeholder : className}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={data.length === 0 || disabled}>
        {defaultValue && <option hidden={true} disabled={true}>{defaultValue}</option>}
        {data.map(({ text, value }) =>
          <option
            key={value}
            value={value}>
            {text}
          </option>
        )}
    </select>
    {invalid && <div className={invalidStyle}>Пожалуйста, выберите дату</div>}
  </div>
);

Select.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  data: PropTypes.array,
  value: PropTypes.string,
  invalid: PropTypes.bool,
  invalidStyle: PropTypes.string,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  className: '',
  defaultValue: '',
  name: '',
  onChange: () => {},
  onBlur: () => {},
  data: [],
  value: '',
  invalid: false,
  invalidStyle: '',
  disabled: false,
};

export default Select;
