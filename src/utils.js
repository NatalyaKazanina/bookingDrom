export function handleCities(cities) {
  return cities.map((city, index) => ({
    text: city.name,
    value: index,
  }))
}

export function handleDates(dates) {
  function formatDate(dateString) {
    const dateArray = dateString.split('-');
    return new Date(dateArray[0], dateArray[1], dateArray[2]).toLocaleString("ru", {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  }

  return Object
    .keys(dates)
    .filter(day =>
      Object.values(dates[day]).some(time =>
        time.is_not_free !== true
      )
    )
    .map(day => (
      {
        text: formatDate(day),
        value: day
      }
    ));
}

export function handleHours(hours) {
  return Object
    .keys(hours)
    .filter(hour =>
      hours[hour].is_not_free !== true
    )
    .map(hour => (
      {
        text: `${hours[hour].begin.toString()}-${hours[hour].end.toString()}`,
        value: hour
      }
    ));
}