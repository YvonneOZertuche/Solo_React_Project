import React, { useEffect } from "react"


const FlashMessages = (props) => {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center alert-dismissible fade show" role="alert">{msg}</div>
        )
      })}
    </div>
  )
}

export default FlashMessages
