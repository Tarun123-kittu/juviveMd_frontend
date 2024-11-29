import React from 'react' 
import LoaderImage from "../../Images/app_loader.gif"

const Loader = () => {
  return (
    <div className='text-center loader_img'>
        <img className='' src={LoaderImage} alt="Loader" />
    </div>
  )
}

export default Loader