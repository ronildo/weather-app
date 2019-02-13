export const TemperatureConverter = (value, unit = 'fahrenheit') => {
  // convert temperature as API send it in Kelvins
  const celsius = value - 273
  const fahrenheit = Math.floor(celsius * (9 / 5) + 32)
  const tempObj = { celsius, fahrenheit }

  return tempObj[unit]
}
