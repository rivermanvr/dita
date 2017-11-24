export const handleAxiosErrors = err => {
  return err.response.data.split(',').map(message => message.slice(message.indexOf(':') + 2))
}