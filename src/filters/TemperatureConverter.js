export const TemperatureConverter = (value, unit) => {
  if (!unit) unit = 'fahrenheit'
  const celsius = value - 273
  const fahrenheit = Math.floor(celsius * (9 / 5) + 32)
  const tempObj = { celsius, fahrenheit }

  return tempObj[unit]
}
