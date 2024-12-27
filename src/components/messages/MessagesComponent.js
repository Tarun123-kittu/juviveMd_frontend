import React from 'react'
import DefaultImage from '../../Images/default_user.svg'
import './messages.css'
const MessagesComponent = () => {
  return (
    <div className='wrapper'>
      <div className='inner_wrapper'>

      <div className='d-flex gap-3'>
        <div className='messages_list'>
        <div className="cmn_head mb-3">
        <h2>Messages</h2>
        </div>
        <ul> 
          <li className='d-flex gap-2 align-items-center active'><img src={DefaultImage} alt="user image" />
            <div className='message_user flex-grow-1 '>
              <h6>Aman Deep</h6>
              <span>Typing...</span>
            </div>
            <span className='message_time'>4:30 PM</span>
          </li>
          <li className='d-flex gap-2 align-items-center'><img src={DefaultImage} alt="user image" />
            <div className='message_user flex-grow-1 '>
              <h6>Aman Deep</h6>
              <span>Typing...</span>
            </div>
            <span className='message_time'>4:30 PM</span>
          </li>
        </ul>
        </div>
        <div className='messages_content flex-grow-1'>
        <div className='d-flex gap-2 align-items-center message_head '><img src={DefaultImage} alt="user image" />
            <div className='message_user flex-grow-1 '>
              <h6>Aman Deep</h6>
              <span>Online</span>
            </div>
            <span className='message_time'>4:30 PM</span>
          </div>
         <div className='user_chat'>
        {/* left message */}
        <ul className='conversation_list pe-3 ps-3'> 
            <li className='d-flex gap-2 align-items-start conversation_item w-50'><img src={DefaultImage} alt="user image" />
            <div className='message_user flex-grow-1'>
              <div className='d-flex gap-2'>

              <h6>Aman Deep</h6>
            <span className='message_time'>4:30 PM</span>
              </div>
              <p className='message_dialogue'>I need your help</p>
            </div>
          </li> 
            </ul>
        
        {/* left message */}
        {/* right message */}
        <ul className='conversation_list right_conversation ps-3 pe-3'> 
            <li className='d-flex gap-2 align-items-start conversation_item w-50 ms-auto'>
            <div className='message_user flex-grow-1 '>
              <div className='d-flex gap-2 justify-content-end'>

              <h6>Aman Deep</h6>
            <span className='message_time'>4:30 PM</span>
              </div>
              <p className='message_dialogue'>I need your help</p>
            </div>
            <img src={DefaultImage} alt="user image" />
          </li> 
            </ul>
        {/* right message */}
         </div>
            <div className='send_message'>
              <input type="text" placeholder='Add a comment...'/> <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0109 0.713947C22.5107 -0.240764 25.0186 2.05791 23.977 4.34922L16.7909 20.1574C15.3855 23.249 10.4422 22.7264 9.84149 19.4228L8.94495 14.4922L3.56576 13.6705C-0.0384809 13.1199 -0.608585 8.58885 2.7643 7.30069L20.0109 0.713947ZM21.7373 3.49386C21.9456 3.0356 21.4441 2.57586 20.9441 2.76681L3.69749 9.35355C2.57319 9.78294 2.76323 11.2933 3.96464 11.4768L9.34383 12.2986C10.3665 12.4548 11.1678 13.1893 11.3382 14.1266L12.2348 19.0572C12.435 20.1584 14.0828 20.3326 14.5512 19.3021L21.7373 3.49386Z" fill="#0C5E62"/>
          </svg>

            </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MessagesComponent