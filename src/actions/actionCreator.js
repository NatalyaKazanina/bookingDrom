import { ADD_ORDER, REMOVE_ORDER } from '../constants';

export const addOrder = (id, city, date, phone, name) => ({
  type: ADD_ORDER,
  id,
  city,
  date,
  phone,
  name,
});

export const removeTask = id => ({
  type: REMOVE_ORDER,
  id
});