export const handleAxiosErrors = err => {
  console.log(err.response.data)
  return err.response.data.split(',').map(message => (
    message.match(/Validation Error: /gi) ?
      message.slice(message.indexOf(':') + 2) :
      message
  ))
}