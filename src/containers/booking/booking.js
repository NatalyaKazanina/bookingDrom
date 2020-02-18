import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';

import { addOrder } from '../../actions/actionCreator';
const { handleCities, handleDates, handleHours } = require('../../utils');

import Head from "../../components/head/head";
import Input from '../../components/input/input';
import Select from "../../components/select/select";
import Footer from "../../components/footer/footer";
import Success from "../../components/success/success";

import style from './booking.css';

// REST API
const BASE_PATH = 'https://www.mocky.io/v2';
const CITIES_PATH = '/5b34c0d82f00007400376066';
const API_PARAM = 'mocky-delay=700ms';

class Booking extends Component {
  state = {
    citiesData: [],
    cities: [],
    city: '0',
    address: '',
    phones: [],
    price: '',
    cityData: [],
    dates: [],
    hours: [],
    date: 'Дата',
    time: 'Время',
    phone: '',
    name: '',
    dateInvalid: null,
    timeInvalid: null,
    phoneInvalid: null,
    nameInvalid: null,
    loading: false,
    successForm: false,
  };

  // вызывется ф-ция fetchCitiesData для получения данных по городам c сервера
  componentDidMount() {
    this.fetchCitiesData();
  }

  fetchCitiesData = () => {
    // ставим свойство loading в значение true для отображения loading-индикатора
    this.setState({
      loading: true
    });
    fetch(`${BASE_PATH}${CITIES_PATH}?${API_PARAM}`)
      .then(res => res.json()) //преобразуем полученные данные в формат json
      .then(result => this.setCitiesData(result)) // вызываем ф-цию setCitiesData для записи полученных данных в state
      .catch(error => error); // отлавливаем ошибки
  };

  // делаем запрос для получения данных по конкретному городу
  fetchCityData = (city) => {
    this.setState({
      loading: true
    });
    fetch(`${BASE_PATH}/${city.id}?${API_PARAM}`)
      .then(res => res.json())
      .then(result => this.setCityData(result))
      .catch(error => error);
  };

  // добавляем в state данные
  setCitiesData = result => {
    const { city } = this.state;
    this.setState({
      citiesData: result.cities,
      cities: handleCities(result.cities),
      address: result.cities[city].address,
      phones: result.cities[city].phones,
      price: result.cities[city].price,
      loading: false,
    });
    this.fetchCityData(result.cities[city]);
  };

  // кладём данные города в state и отформатированные даты
  setCityData = result => {
    this.setState({
      cityData: result.data,
      dates: handleDates(result.data),
      loading: false,
    });
  };

  // обрабатываем выбор конкретного города
  handleSelectCityChange = ({ target: { value } }) => {
    const { citiesData } = this.state;
    this.setState({
      city: value,
      date: 'Дата',
      hours: [],
      time: 'Время',
      address: citiesData[value].address,
      phones: citiesData[value].phones,
      price: citiesData[value].price,
      dateInvalid: false,
      timeInvalid: false,
    });
    this.fetchCityData(citiesData[value]); // делаем запрос по выбранному городу
  };

  // кладём данные города в state и отформатированное время
  handleSelectDateChange = ({ target: { value } }) => {
    const { cityData } = this.state;
    this.setState({
      hours: handleHours(cityData[value]),
      date: value,
      time: 'Время',
    })
  };

  // значения из input кладём в state (время, телефон, имя)
  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    })
  };

  // проверка заполнения полей формы на валидность
  handleInputBlur = ({ target: { value, name } }) => {
    const { cityData, date } = this.state;
    switch (name) {
      case 'date':
        this.setState({
            dateInvalid: !Object.keys(cityData).includes(value)
          });
        break;
      case 'time':
        this.setState({
          timeInvalid: !Object.keys(cityData[date]).includes(value)
        });
        break;
      case 'phone':
        this.setState({
          phoneInvalid: !/\+7\s\(\d{3}\)\s\d{3}(-\d{2}){2}$/.test(value)
        });
        break;
      case 'name':
        this.setState({
          nameInvalid: value === ''
        });
        break;
      default:
    }
  };

  // добавляем запись с данными из формы
  handleSubmitForm = (event) => {
    event.preventDefault(); 
    const { city, time, phone, name, citiesData } = this.state;
    const { addOrder } = this.props;
    addOrder((new Date()).getTime(), citiesData[city].name, time, phone, name);
    this.setState({
      successForm: true,
    });

  };

  // очищение полей формы
  cleanForm = () => {
    this.setState({
      hours: [],
      date: 'Дата',
      time: 'Время',
      phone: '',
      name: '',
      successForm: false,
      dateInvalid: null,
      timeInvalid: null,
      phoneInvalid: null,
      nameInvalid: null
    })
  };

  render() {
    const {
      city,
      loading,
      address,
      phones,
      price,
      cities,
      dates,
      hours,
      date,
      time,
      phone,
      name,
      dateInvalid,
      timeInvalid,
      phoneInvalid,
      nameInvalid,
      successForm,
    } = this.state;

    const validForm =
      dateInvalid === false &&
      timeInvalid === false &&
      phoneInvalid === false &&
      nameInvalid === false;

    return (
      <div className={style.body}>
        <Head title={`Онлайн запись`} loading={loading} />
        <form 
          className={loading ? style.formLoading : ''} 
          onSubmit={this.handleSubmitForm}>
          {
            // отображение полей формы
          }
          <Select
            // через props передаём свойства в компонент
            className={style.input}
            onChange={this.handleSelectCityChange}
            onBlur={this.handleInputBlur}
            data={cities}
            value={city}
            disabled={loading} />
          <div className={style.cityData}>
            <div>{address}</div>
            <div>
            {
              // перебор телефонов, полученных с сервера
            }
              {phones.map((phone, index) =>
                <a className={style.phone} key={phone} href={`tel:${phone}`}>
                  {phone.replace(/(7)(\d{3})(\d{3})(\d{2})(\d{2})/i, '+$1 ($2) $3-$4-$5')} 
                  {
                    // регулярное выражение для правильного отображения номеров телефонов
                  }
                  {(index !== phones.length - 1) ? `, ` : ``}
                </a>
              )}
            </div>
            {price && <div>Стоимость услуги {price} ₽</div>}
          </div>
          <div className={style.selectsWrapper}>
            <Select
              className={dateInvalid ? style.input + ' ' + style.invalid : style.input}
              defaultValue={'Дата'}
              name='date'
              onChange={this.handleSelectDateChange}
              onBlur={this.handleInputBlur}
              data={dates}
              value={date}
              invalid={dateInvalid}
              invalidStyle={style.invalidText}
              disabled={loading} />
            <Select
              className={timeInvalid ? style.input + ' ' + style.invalid : style.input}
              defaultValue={'Время'}
              name='time'
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              data={hours}
              value={time}
              invalid={timeInvalid}
              invalidStyle={style.invalidText}
              disabled={loading} />
          </div>
          <InputMask
            className={phoneInvalid ? style.input + ' ' + style.invalid : style.input}
            name='phone'
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            value={phone}
            mask='+7 (999) 999-99-99'
            placeholder='+7 (___) ___-__-__' />
            {
              // если формат телефона не валиден, выводим сообщение
            }
          {phoneInvalid && <div className={style.invalidText}> 
            Пожалуйста, введите корректный телефон, иначе наши специалисты не смогут связаться с вами
          </div>}
          <Input
            className={nameInvalid ? style.input + ' ' + style.invalid : style.input}
            name='name'
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            value={name}
            invalid={nameInvalid}
            invalidStyle={style.invalidText} />
          <input
            className={validForm ? style.button + ' ' + style.buttonActive : style.button}
            type='submit'
            value='Записаться'
            disabled={!validForm} />
        </form>
        <Footer />
        {successForm && <Success onClick={this.cleanForm}/>}
      </div>
    );
  }
}

// соединение с Redux с помощью ф-ции connect, диспачим ф-цию addOrder
export default connect(null, { addOrder })(Booking);
