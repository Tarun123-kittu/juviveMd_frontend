import React, { useEffect, useState, useRef } from 'react'
import DefaultImage from '../../Images/default_user.svg'
import './messages.css'
import { recent_chats } from '../../redux/slices/chatSlice/recentChats'
import { useDispatch, useSelector } from 'react-redux'
import { get_whole_chat, clear_whole_chat_state } from '../../redux/slices/chatSlice/getWholeChat'
import { send_message, clear_send_message_state } from '../../redux/slices/chatSlice/sendMessages'
import { getRoutePermissions } from '../../middleware/permissionsMiddleware/getRoutePermissions'
import { permission_constants } from '../../constants/permissionConstants'
import Nodata from "../StaticComponents/Nodata"

const MessagesComponent = () => {
  const dispatch = useDispatch()
  const chatRef = useRef(null);
  const [chats, setChats] = useState([])
  const [chatData, setChatData] = useState([])
  const [openChat, setOpenChat] = useState(true)
  const [page, setPage] = useState(1)
  const [openChatName, setOpenChatName] = useState('')
  const [openChatId, setOpenChatId] = useState('')
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [chatIndex, setChatIndex] = useState(0)
  const all_chats = useSelector((store) => store.RECENT_CHATS)
  const wholeChat = useSelector((store) => store.GET_WHOLE_CHAT)
  const is_message_sent = useSelector((store) => store.SEND_MESSAGE)
  const [firstPermissionChat] = getRoutePermissions(permission_constants?.CHAT);

  useEffect(() => {
    dispatch(recent_chats({ page: 1 }))
  }, [])

  useEffect(() => {
    if (all_chats?.isSuccess) {
      setChats(all_chats?.data?.data?.items)
      if (all_chats?.data?.data?.items?.length > 0) {
        setOpenChat(true)
        setOpenChatId(all_chats?.data?.data?.items[0]?.receiverId === localStorage.getItem('user_id') ? all_chats?.data?.data?.items[0]?.senderId : all_chats?.data?.data?.items[0]?.receiverId)
        setOpenChatName(all_chats?.data?.data?.items[0]?.receiverId === localStorage.getItem('user_id') ? all_chats?.data?.data?.items[0]?.sender?.firstName : all_chats?.data?.data?.items[0]?.receiver?.firstName)
      }
    }
  }, [all_chats])

  useEffect(() => {
    if (openChatId) {
      dispatch(get_whole_chat({ page: page, receiverId: openChatId }));
    }
  }, [openChatId, page]);

  useEffect(() => {
    if (wholeChat?.isSuccess) {
      const newItems = wholeChat?.data?.data?.items || [];

      setChatData((prevData) => {
        const mergedData = [
          ...prevData,
          ...newItems.filter(item => !prevData.some(existingItem => existingItem.id === item.id))
        ];
        const sortedData = mergedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        return sortedData;
      });
    }
  }, [wholeChat]);

  const handleSendMessage = () => {
    if (!message) {
      setMessageError("Please enter your message here")
      return
    }
    dispatch(send_message({ receiverId: openChatId, message }))
  }

  useEffect(() => {
    if (is_message_sent?.isSuccess) {
      dispatch(get_whole_chat({ page: page, receiverId: openChatId }))
      dispatch(recent_chats({ page: 1 }))
      dispatch(clear_send_message_state())
      setMessage('')
    }
    if (is_message_sent?.isError) {
      dispatch(clear_send_message_state())
      setMessageError("Error While Sending Message")
    }
  }, [is_message_sent])

  const handleScroll = (e) => {
    const totalPages = wholeChat?.data?.data?.totalPages;
    const { scrollTop } = e.target;

    if (scrollTop <= 50 && page < totalPages) {
      setPage((prevPage) => {
        const newPage = Math.min(totalPages, prevPage + 1);
        if (newPage !== prevPage) {
          setPage(newPage)
        }
        return newPage;
      });
    }

    const chatContainer = chatRef.current;
    if (chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      const chatContainer = chatRef.current;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [chatData, isAtBottom]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='wrapper'>
      <div className='inner_wrapper'>

        <div className='d-flex gap-3'>
          <div className='messages_list'>
            <div className="cmn_head mb-3">
              <h2>Messages</h2>
            </div>
            <ul>
              {Array.isArray(chats) && chats?.length !== 0 && chats.map((chat, i) => {
                return (
                  <li key={i} className={`d-flex gap-2 align-items-center ${chatIndex === i ? "active" : "shadow p-2 bg-white rounded"}`} style={{ cursor: "pointer" }} onClick={() => { setOpenChatId(chat?.senderId === localStorage.getItem('user_id') ? chat.receiverId : chat.senderId); setOpenChatName(chat?.senderId === localStorage.getItem('user_id') ? chat.receiver?.firstName : chat.sender?.firstName); setPage(1); setChatData([]); dispatch(clear_whole_chat_state()); setChatIndex(i) }}><img src={DefaultImage} alt="user image" />
                    <div className='message_user flex-grow-1 '>
                      <h6>{chat?.senderId === localStorage.getItem('user_id') ? chat?.receiver?.firstName : chat?.sender?.firstName}</h6>
                      <span>{chat?.message}</span>
                    </div>
                    <span className='message_time'>
                      {new Date(chat.createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }).replace(',', ',')}
                    </span>

                  </li>
                )
              })}
            </ul>
          </div>
          {openChat && openChatId && <div className='messages_content flex-grow-1'>
            <div>
              <div className='d-flex gap-2 align-items-center message_head '><img src={DefaultImage} alt="user image" />
                <div className='message_user flex-grow-1 '>
                  <h6>{openChatName}</h6>
                  {/* <span>Online</span> */}
                </div>
                {/* <span className='message_time'>4:30 PM</span> */}
              </div>
              <div
                className='user_chat'
                onScroll={handleScroll}
                ref={chatRef}
              >
                {Array.isArray(chatData) && chatData.length > 0 ? (
                  chatData?.map((item) => {
                    const myId = localStorage.getItem('user_id');
                    const isSentByMe = item.senderId === myId;

                    return (
                      <div key={item.id}>
                        {isSentByMe ? (
                          <ul className='conversation_list right_conversation ps-3 pe-3'>
                            <li className='d-flex gap-2 align-items-start conversation_item w-50 ms-auto'>
                              <div className='message_user flex-grow-1'>
                                <div className='d-flex gap-2 justify-content-end'>
                                  <h6>{item.sender?.firstName || 'You'}</h6>
                                  <span className='message_time'>
                                    {new Date(item.createdAt).toLocaleString('en-GB', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true
                                    }).replace(',', ',')}
                                  </span>
                                </div>
                                <p className='message_dialogue'>{item.message}</p>
                              </div>
                              <img
                                src={item.sender?.image || DefaultImage}
                                alt='Your image'
                                width={35}
                                height={35}
                                className='round_image'
                              />
                            </li>
                          </ul>
                        ) : (
                          <ul className='conversation_list pe-3 ps-3'>
                            <li className='d-flex gap-2 align-items-start conversation_item w-50'>
                              <img
                                src={item.sender?.image || DefaultImage}
                                alt='Sender image'
                              />
                              <div className='message_user flex-grow-1'>
                                <div className='d-flex gap-2'>
                                  <h6>{item.sender?.firstName || 'Sender'}</h6>
                                  <span className='message_time'>
                                    {new Date(item.createdAt).toLocaleString('en-GB', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true
                                    }).replace(',', ',')}
                                  </span>
                                </div>
                                <p className='message_dialogue'>{item.message}</p>
                              </div>
                            </li>
                          </ul>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <h3 className='p-5 text-center'>No Messages</h3>
                )}
              </div>
            </div>
            {messageError && <span className='message_errors'>{messageError}</span>}
            {firstPermissionChat?.canCreate && < div className='send_message d-flex gap-2 align-items-center'>
              <input style={messageError ? { border: "1px solid red" } : {}} type="text" placeholder='Write Message...' value={message} onChange={(e) => { setMessage(e.target.value); setMessageError('') }} onKeyDown={handleKeyDown} />
              {!is_message_sent?.isLoading ? <svg onClick={() => handleSendMessage()} width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0109 0.713947C22.5107 -0.240764 25.0186 2.05791 23.977 4.34922L16.7909 20.1574C15.3855 23.249 10.4422 22.7264 9.84149 19.4228L8.94495 14.4922L3.56576 13.6705C-0.0384809 13.1199 -0.608585 8.58885 2.7643 7.30069L20.0109 0.713947ZM21.7373 3.49386C21.9456 3.0356 21.4441 2.57586 20.9441 2.76681L3.69749 9.35355C2.57319 9.78294 2.76323 11.2933 3.96464 11.4768L9.34383 12.2986C10.3665 12.4548 11.1678 13.1893 11.3382 14.1266L12.2348 19.0572C12.435 20.1584 14.0828 20.3326 14.5512 19.3021L21.7373 3.49386Z" fill="#0C5E62" />
              </svg>
                :
                <div class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>}

            </div>}

          </div>}
        </div>
        {chats?.length === 0 &&<div className='no_messages'>
            <Nodata />
          </div>}
      </div>
    </div >
  )
}

export default MessagesComponent