import React from 'react'
import "./loader.css"

const Loader = ({wrapclass}) => {
  return (
    <div className={`${wrapclass} text-center loader_img`}>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  )
}

export default Loader