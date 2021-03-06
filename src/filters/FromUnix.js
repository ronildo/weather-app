// Format data from unix time stamp
export const FromUnix = (unixTimestamp) => {
  return (unixTimestamp)
    ? new Date(unixTimestamp * 1000).toLocaleString('en-US')
    : 'N/A'
}
