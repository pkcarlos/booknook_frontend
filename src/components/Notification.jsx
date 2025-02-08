const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }

  let messageType
  let message

  if (successMessage) {
    messageType = "success"
    message = successMessage
  } else if (errorMessage) {
    messageType = "error"
    message = errorMessage
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )

}

export default Notification