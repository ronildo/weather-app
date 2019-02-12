export const DegreesToCompass = (degrees) => {
  var val = Math.floor((degrees / 22.5) + 0.5)
  var arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return arr[(val % 16)]
}
