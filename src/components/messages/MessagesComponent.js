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
import { read_message, clear_read_message_state } from '../../redux/slices/chatSlice/readMessages'
import NoChats from '../../Images/noChats.svg'
import Loader from "../../common/Loader/Loader";

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
  const [chatIndex, setChatIndex] = useState(null)
  const [lastMessage, setLastMessage] = useState("")
  const all_chats = useSelector((store) => store.RECENT_CHATS)
  const wholeChat = useSelector((store) => store.GET_WHOLE_CHAT)
  const is_message_sent = useSelector((store) => store.SEND_MESSAGE)
  const [firstPermissionChat] = getRoutePermissions(permission_constants?.CHAT);
  const is_message_read = useSelector((store) => store.READ_MESSAGE)

  useEffect(() => {
    dispatch(recent_chats({ page: 1 }))
  }, [])

  useEffect(() => {
    if (all_chats?.isSuccess) {
      setChats(all_chats?.data?.data?.items)
    }
  }, [all_chats])

  useEffect(() => {
    if (openChatId) {
      dispatch(read_message({ receiverId: openChatId }))
    }
  }, [openChatId])

  useEffect(() => {
    if (openChatId) {
      dispatch(get_whole_chat({ page: page, receiverId: openChatId }));
    }
  }, [openChatId, page]);

  useEffect(() => {
    if (wholeChat?.isSuccess) {
      const apiMessages = wholeChat?.data?.data?.items || [];

      setChatData((prevChatData) => {

        const existingMessageIds = new Set(prevChatData.map((msg) => msg.id));

        const newMessages = apiMessages.filter(
          (apiMessage) => !existingMessageIds.has(apiMessage.id)
        );

        const updatedChatData = prevChatData.map((tempMessage) => {
          if (tempMessage.isTemporary) {
            const matchingApiMessage = newMessages.find(
              (apiMessage) =>
                apiMessage.message === tempMessage.message &&
                apiMessage.senderId === tempMessage.senderId &&
                apiMessage.receiverId === tempMessage.receiverId
            );
            if (matchingApiMessage) {
              newMessages.splice(newMessages.indexOf(matchingApiMessage), 1);
              return matchingApiMessage;
            }
          }
          return tempMessage;
        });


        const mergedChatData = [...updatedChatData, ...newMessages].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        return mergedChatData;
      });
    }
  }, [wholeChat]);




  const handleSendMessage = () => {
    if (!message) {
      setMessageError("Please enter your message here");
      return;
    }
    setLastMessage(message)

    const tempMessage = {
      id: `temp-${Date.now()}`,
      message,
      createdAt: new Date().toISOString(),
      read: false,
      receiverId: openChatId,
      senderId: localStorage.getItem("user_id"),
      sender: {
        firstName: localStorage.getItem("user_name") || "You",
        roleName: "Trainer",
      },
      receiver: {
        image: null,
        firstName: openChatName,
        roleName: "Patient",
      },
      isTemporary: true,
    };

    setChatData((prevData) => [...prevData, tempMessage]);
    setMessage("");

    dispatch(send_message({ receiverId: openChatId, message }));
  };



  useEffect(() => {
    if (is_message_sent?.isSuccess) {
      dispatch(get_whole_chat({ page, receiverId: openChatId }));
      dispatch(recent_chats({ page: 1 }));
      dispatch(read_message({ receiverId: openChatId }));
      dispatch(clear_send_message_state());
    }

    if (is_message_sent?.isError) {
      setChatData((prevData) =>
        prevData.filter((item) => !item.isTemporary)
      );
      dispatch(clear_send_message_state());
      setMessageError("Error While Sending Message");
    }
  }, [is_message_sent]);




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

  useEffect(() => {
    if (is_message_read?.isSuccess) {
      dispatch(recent_chats({ page: 1 }))
      dispatch(clear_read_message_state())
    }
  }, [is_message_read])
  
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
                  <li key={i} className={`d-flex gap-2 align-items-center ${chatIndex === i ? "disabled" : ""} ${chat?.read || chatIndex === i ? "shadow p-2 bg-white rounded" : "active"}`} aria-disabled="true" style={{ cursor: "pointer" }} onClick={() => { setChatIndex(i); setOpenChatId(chat?.senderId === localStorage.getItem('user_id') ? chat.receiverId : chat.senderId); setOpenChatName(chat?.senderId === localStorage.getItem('user_id') ? chat.receiver?.firstName : chat.sender?.firstName); setPage(1); setChatData([]); dispatch(clear_whole_chat_state()); setChatIndex(i) }}><img height={35} width={35} className='round_image' src={chat?.receiver?.image || DefaultImage} alt="user image" />
                    <div className='message_user flex-grow-1 '>
                      <div className='d-flex'>
                        <h6 className='flex-grow-1'>{chat?.senderId === localStorage.getItem('user_id') ? chat?.receiver?.firstName : chat?.sender?.firstName}</h6>

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
                      </div>
                      <span>{all_chats?.isLoading && chatIndex === i ? lastMessage : chat?.message?.length > 40 ? chat?.message?.slice(0, 40) + "..." : chat?.message}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {(openChat && openChatId) ? <div className='messages_content flex-grow-1'>
            <div>
              <div className='d-flex gap-2 align-items-center message_head '><img src={DefaultImage} alt="user image" />
                <div className='message_user flex-grow-1 '>
                  <h6>{openChatName}</h6>
                </div>
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
                          <ul className='conversation_list right_conversation ps-5 pe-3 w-50 ms-auto'>
                            <li className='d-flex gap-2 align-items-start conversation_item '>
                              <div className='message_user flex-grow-1'>
                                <div className='d-flex gap-2 justify-content-end'>
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
                                  <h6>{item.sender?.firstName || localStorage.getItem('user_name')}</h6>
                                </div>
                                <p className='message_dialogue'>{item.message}</p>
                              </div>
                              <img
                                src={item.sender?.image || localStorage.getItem('juvive_image_url')}
                                alt='Your'
                                width={35}
                                height={35}
                                className='round_image'
                              />
                            </li>
                          </ul>
                        ) : (
                          <ul className='conversation_list pe-5 ps-3 w-50'>
                            <li className='d-flex gap-2 align-items-start conversation_item'>
                              <img
                                src={item.sender?.image || DefaultImage}
                                alt='Sender'
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
                  <h3 className='p-5 text-center'> <Loader /></h3>
                )}
              </div>
            </div>
            {messageError && <span className='message_errors'>{messageError}</span>}
            {firstPermissionChat?.canCreate && < div className='send_message d-flex gap-2 align-items-center'>
              <input style={messageError ? { border: "1px solid red" } : {}} type="text" placeholder='Write Message...' value={message} onChange={(e) => { setMessage(e.target.value); setMessageError('') }} onKeyDown={handleKeyDown} />
              <svg className={`${message.length === 0 ? "d-none" : ""}`} onClick={() => handleSendMessage()} width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0109 0.713947C22.5107 -0.240764 25.0186 2.05791 23.977 4.34922L16.7909 20.1574C15.3855 23.249 10.4422 22.7264 9.84149 19.4228L8.94495 14.4922L3.56576 13.6705C-0.0384809 13.1199 -0.608585 8.58885 2.7643 7.30069L20.0109 0.713947ZM21.7373 3.49386C21.9456 3.0356 21.4441 2.57586 20.9441 2.76681L3.69749 9.35355C2.57319 9.78294 2.76323 11.2933 3.96464 11.4768L9.34383 12.2986C10.3665 12.4548 11.1678 13.1893 11.3382 14.1266L12.2348 19.0572C12.435 20.1584 14.0828 20.3326 14.5512 19.3021L21.7373 3.49386Z" fill="#0C5E62" />
              </svg>

            </div>}

          </div> : <div className='no_cahts'>
                <img src={NoChats} alt="noChats" className='img-fluid'/>
          <h5>No chat selected</h5>
            </div>}
        </div>
        {chats?.length === 0 && <div className='no_messages'>
          <Nodata />
        </div>}
      </div>
    </div>
  )
}

export default MessagesComponent