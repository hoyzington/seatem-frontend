export const logErrors = (errors) => {
  return {
    type: 'LOG_ERRORS',
    errors,
  }
}

export const clearErrors = () => {
  return {
    type: 'CLEAR_ERRORS',
  }
}
