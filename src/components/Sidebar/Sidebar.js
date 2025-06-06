import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SidebarMenuItems } from './SidebarMenu'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import UserImage from '../../Images/default_use.svg'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { get_quotes } from '../../redux/slices/quotesSlice/quotesSlice'
import { getRoutePermissions } from '../../middleware/permissionsMiddleware/getRoutePermissions'
import { permission_constants } from '../../constants/permissionConstants'
import { get_single_staff } from '../../redux/slices/staffSlice/getStaffByIdSlice'
import DeleteModal from '../Modals/DeleteModal'
import { recent_chats } from '../../redux/slices/chatSlice/recentChats'
import Skeleton from 'react-loading-skeleton'
import src from 'react-select'

const Sidebar = () => {
  const token = Cookies.get('authToken');
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()

  const location = useLocation();
  const { pathname } = location
  const navigate = useNavigate()
  const [quotes, setQuotes] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [unreadChats, setUnreadChats] = useState([])
  const [chats, setChats] = useState(false)
  const splitLocation = pathname.split("/");
  const quotes_list = useSelector((store) => store.GET_QUOTES)
  const user_details = useSelector((store) => store.STAFF_DETAIL)
  const all_chats = useSelector((store) => store.RECENT_CHATS)
  const current_date = new Date();
  const month = current_date.getMonth() + 1;
  const isThirtyDayMonth = [4, 6, 9, 11].includes(month);
  const day =
    isThirtyDayMonth || current_date.getDate() >= 30
      ? current_date.getDate() - 2
      : current_date.getDate();

  const [firstPermissionChat] = getRoutePermissions(permission_constants?.CHAT);
  const [firstPermissionStaff] = getRoutePermissions(permission_constants?.STAFF);
  const [firstPermissionPatient] = getRoutePermissions(permission_constants?.PATIENT);
  const [firstPermissionExercise] = getRoutePermissions(permission_constants?.EXERCISE);
  const [firstPermissionDashboard] = getRoutePermissions(permission_constants?.DASHBOARD);
  const [firstPermissionSettings] = getRoutePermissions(permission_constants?.SETTINGS);

  if (!token) {
    navigate("/")
  }

  useEffect(() => {
    if (chats && pathname !== "/messages ") {
      dispatch(recent_chats({ page: 1 }))
    }
  }, [chats])

  useEffect(() => {
    if (quotes?.length === 0) {
      dispatch(get_quotes())
    }
  }, [])

  useEffect(() => {
    dispatch(get_single_staff({ staffId: localStorage.getItem('user_id') }))
  }, [])

  useEffect(() => {
    if (quotes_list?.isSuccess) {
      setQuotes(quotes_list?.data?.quotes)
    }
  }, [quotes_list, dispatch])

  const handleLogout = () => {
    Cookies.remove('authToken');
    localStorage.clear()
    navigate("/")
    toast.success("Logout Successful")
  }

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  useEffect(() => {
    if (all_chats?.isSuccess) {
      const chatCount = all_chats?.data?.data?.items.filter((el) => el.read === false)
      if (pathname === "/messages") {
        if (chatCount?.length > 0) {
          setUnreadChats(chatCount)
        } else {
          setUnreadChats([])
        }
      } else {
        setUnreadChats(chatCount)
      }
      setChats(false)
    }
  }, [all_chats])

  const userImageUrl = user_details?.data?.data?.image;
  localStorage.setItem("juvive_image_url", userImageUrl)
  return (
    <div className='sidebar_wrapper'>
      <div className='header d-flex align-items-center gap-2'>
        {toggle ? <svg onClick={() => { setToggle(!toggle) }} className='toggle_btn toggleOff' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.64016 2.27L7.50016 6.13L11.3402 2.29C11.425 2.19972 11.5272 2.12749 11.6406 2.07766C11.754 2.02783 11.8763 2.00141 12.0002 2C12.2654 2 12.5197 2.10536 12.7073 2.29289C12.8948 2.48043 13.0002 2.73478 13.0002 3C13.0025 3.1226 12.9797 3.24439 12.9333 3.35788C12.8869 3.47138 12.8178 3.57419 12.7302 3.66L8.84016 7.5L12.7302 11.39C12.895 11.5512 12.9916 11.7696 13.0002 12C13.0002 12.2652 12.8948 12.5196 12.7073 12.7071C12.5197 12.8946 12.2654 13 12.0002 13C11.8727 13.0053 11.7456 12.984 11.6268 12.9375C11.508 12.8911 11.4002 12.8204 11.3102 12.73L7.50016 8.87L3.65016 12.72C3.56567 12.8073 3.46473 12.8769 3.35316 12.925C3.2416 12.9731 3.12163 12.9986 3.00016 13C2.73495 13 2.48059 12.8946 2.29306 12.7071C2.10552 12.5196 2.00016 12.2652 2.00016 12C1.99783 11.8774 2.02058 11.7556 2.06701 11.6421C2.11344 11.5286 2.18257 11.4258 2.27016 11.34L6.16016 7.5L2.27016 3.61C2.10535 3.44876 2.0087 3.23041 2.00016 3C2.00016 2.73478 2.10552 2.48043 2.29306 2.29289C2.48059 2.10536 2.73495 2 3.00016 2C3.24016 2.003 3.47016 2.1 3.64016 2.27Z" fill="black" />
        </svg>
          :
          <svg onClick={() => { setToggle(!toggle) }} className='toggle_btn' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6C4 5.73478 4.10536 5.48043 4.29289 5.29289C4.48043 5.10536 4.73478 5 5 5H19C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6C20 6.26522 19.8946 6.51957 19.7071 6.70711C19.5196 6.89464 19.2652 7 19 7H5C4.73478 7 4.48043 6.89464 4.29289 6.70711C4.10536 6.51957 4 6.26522 4 6ZM4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929C4.48043 11.1054 4.73478 11 5 11H19C19.2652 11 19.5196 11.1054 19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071C19.5196 12.8946 19.2652 13 19 13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12ZM5 17C4.73478 17 4.48043 17.1054 4.29289 17.2929C4.10536 17.4804 4 17.7348 4 18C4 18.2652 4.10536 18.5196 4.29289 18.7071C4.48043 18.8946 4.73478 19 5 19H19C19.2652 19 19.5196 18.8946 19.7071 18.7071C19.8946 18.5196 20 18.2652 20 18C20 17.7348 19.8946 17.4804 19.7071 17.2929C19.5196 17.1054 19.2652 17 19 17H5Z" fill="black" />
          </svg>
        }

        <div className='flex-grow-1'>
          <h4 className='mb-0 text-capitalize'>{getGreeting()}, {localStorage?.getItem('user_name')}</h4>
          {Array?.isArray(quotes) && <p className='quote mb-0'><span className='author_name'>{quotes[day]?.author} - </span>{quotes[day]?.quote}</p>}
        </div>
        <div className='notifications position-relative d-flex align-items-center justify-content-center d-none'>
          <span className='notify_dot'></span>
          <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2089 4.64579C14.4082 4.15318 14.7501 3.73131 15.1907 3.43426C15.6314 3.13721 16.1506 2.97852 16.6821 2.97852C17.2135 2.97852 17.7328 3.13721 18.1734 3.43426C18.614 3.73131 18.9559 4.15318 19.1552 4.64579C21.1278 5.18829 22.8678 6.36334 24.1079 7.99046C25.348 9.61759 26.0196 11.6068 26.0197 13.6527V19.9182L28.4635 23.5839C28.5976 23.7848 28.6746 24.0183 28.6863 24.2596C28.698 24.5008 28.644 24.7407 28.5301 24.9536C28.4161 25.1665 28.2465 25.3445 28.0394 25.4686C27.8322 25.5927 27.5952 25.6583 27.3537 25.6582H21.3042C21.1436 26.7696 20.588 27.7858 19.7391 28.5208C18.8902 29.2558 17.8049 29.6604 16.6821 29.6604C15.5592 29.6604 14.4739 29.2558 13.625 28.5208C12.7762 27.7858 12.2205 26.7696 12.0599 25.6582H6.01042C5.76892 25.6583 5.53194 25.5927 5.32476 25.4686C5.11758 25.3445 4.94798 25.1665 4.83404 24.9536C4.72011 24.7407 4.66612 24.5008 4.67784 24.2596C4.68956 24.0183 4.76654 23.7848 4.90057 23.5839L7.34438 19.9182V13.6527C7.34438 9.35198 10.2524 5.72896 14.2089 4.64579ZM14.7958 25.6582C14.9336 26.0486 15.1891 26.3867 15.527 26.6258C15.865 26.8649 16.2687 26.9933 16.6827 26.9933C17.0967 26.9933 17.5005 26.8649 17.8384 26.6258C18.1764 26.3867 18.4318 26.0486 18.5696 25.6582H14.7945H14.7958ZM16.6821 6.98288C14.9131 6.98288 13.2166 7.68559 11.9658 8.93641C10.715 10.1872 10.0123 11.8837 10.0123 13.6527V20.3224C10.0123 20.5859 9.93436 20.8435 9.78818 21.0628L8.50358 22.9903H24.8592L23.5746 21.0628C23.4289 20.8434 23.3514 20.5858 23.3518 20.3224V13.6527C23.3518 11.8837 22.6491 10.1872 21.3983 8.93641C20.1475 7.68559 18.451 6.98288 16.6821 6.98288Z" fill="white" />
          </svg>

        </div>
      </div>
      <div className={toggle && 'side_bar'}>
        <div className={toggle ? 'sidbar_inner mobile_sidebar' : 'sidbar_inner'}>

          <div className='user_info'>

            {user_details?.isLoading ? <Skeleton
              width={65}
              height={65}
              style={{ borderRadius: '50px' }}
            /> : <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                const userRole = localStorage.getItem('user_role');
                if (userRole === "Trainer") {
                  navigate("dashboard");
                } else if (userRole === "Receptionist") {
                  navigate("/dashboard");
                } else {
                  navigate("/dashboard");
                }
              }}
              src={`${(!userImageUrl || userImageUrl === "null") ? UserImage : userImageUrl}?nocache=${Math.random()}`}

              className='user_image_round'
              alt="user_image"
            />}

            <h6 style={{ cursor: "pointer" }} onClick={() => localStorage.getItem('user_role') === "TRAINER" ? navigate("/trainer/dashboard") : localStorage.getItem('user_role') === "RECEPTIONIST" ? navigate("/reception/dashboard") : navigate("/dashboard")} className='mt-2'>JuviveMD</h6>
            <p>{localStorage.getItem('user_role')}</p>
          </div>
              <ul className='menu_items d-flex flex-column'>
                    {SidebarMenuItems && SidebarMenuItems.map((menus, index) => {
                      const currentPath = window.location.pathname;
                      const isActive = currentPath.startsWith(menus.path);
                      
                      if (menus?.name === "Staff" && firstPermissionStaff?.canRead) {
                          return (
                              <li key={`${index}-staff`} onClick={() => { setToggle(!toggle); setChats(true) }} className={isActive ? "active_menu" : ""}>
                                  <Link className={isActive ? "sidebar_active" : ""} to={menus.path}>
                                      {menus.icon} <span>{menus.name}</span>
                                  </Link>
                              </li>
                          );
                      }
                      if (menus?.name === "Requests" && firstPermissionStaff?.canRead) {
                          return (
                              <li key={`${index}-request`} onClick={() => { setToggle(!toggle); setChats(true) }} className={isActive ? "active_menu" : ""}>
                                  <Link className={isActive ? "sidebar_active" : ""} to={menus.path}>
                                      {menus.icon} <span>{menus.name}</span>
                                  </Link>
                              </li>
                          );
                      } 

                      if (menus?.name === "Exercise" && firstPermissionExercise?.canRead) {
                          return (
                              <li key={`${index}-exercise`} onClick={() => { setToggle(!toggle); setChats(true) }} className={isActive ? "active_menu" : ""}>
                                  <Link className={isActive ? "sidebar_active" : ""} to={menus.path}>
                                      {menus.icon} <span>{menus.name}</span>
                                  </Link>
                              </li>
                          );
                      }

                      if (menus?.name === "Patient" && firstPermissionPatient?.canRead) {
                          return (
                              <li key={`${index}-patient`} onClick={() => { setToggle(!toggle); setChats(true) }} className={isActive ? "active_menu" : ""}>
                                  <Link className={isActive ? "sidebar_active" : ""} to={menus.path}>
                                      {menus.icon} <span>{menus.name}</span>
                                  </Link>
                              </li>
                          );
                      }

                      if (menus?.name === "Dashboard" && firstPermissionDashboard?.canRead) {
                          return (
                              <li key={`${index}-dashboard`} onClick={() => { setToggle(!toggle); setChats(true) }} className={isActive ? "active_menu" : ""}>
                                  <Link className={isActive ? "sidebar_active" : ""} to={menus.path}>
                                      {menus.icon} <span>{menus.name}</span>
                                  </Link>
                              </li>
                          );
                      }

                      if (menus?.name === "Settings" && firstPermissionSettings?.canRead) {
                          return (
                              <li key={`${index}-settings`} onClick={() => { setToggle(!toggle); setChats(true) }} className={isActive ? "active_menu" : ""}>
                                  <Link className={isActive ? "sidebar_active" : ""} to={menus.path}>
                                      {menus.icon} <span>{menus.name}</span>
                                  </Link>
                              </li>
                          );
                      }

                      // Handling Messages
                      if (menus?.name === "Messages" && firstPermissionChat?.canRead) {
                          return (
                              <li key={`${index}-messages`} onClick={() => { setToggle(!toggle); setChats(true) }} className={isActive ? "active_menu" : ""}>
                                  <Link className={isActive ? "sidebar_active" : ""} to={menus.path}>
                                      {menus.icon} <span>
                                          {menus.name} <span className={`${unreadChats?.length > 0 ? "messsage_count" : ""}`}>
                                              {`${Array.isArray(unreadChats) && unreadChats.length ? unreadChats.length : ''}`}
                                          </span>
                                      </span>
                                  </Link>
                              </li>
                          );
                      }

                      // If no conditions match, return null
                      return null;
                  })}
            <li onClick={() => setShowDeleteModal(true)} className='log_out'>
              <div className='d-flex align-items-center '>
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.26849 2.44134H14.6351V10.0159H16.181V2.44134C16.181 2.03136 16.0181 1.63817 15.7282 1.34827C15.4383 1.05837 15.0451 0.895508 14.6351 0.895508H2.26849C1.85851 0.895508 1.46532 1.05837 1.17542 1.34827C0.88552 1.63817 0.722656 2.03136 0.722656 2.44134V20.9913C0.722656 21.4013 0.88552 21.7945 1.17542 22.0844C1.46532 22.3743 1.85851 22.5371 2.26849 22.5371H14.6351C15.0451 22.5371 15.4383 22.3743 15.7282 22.0844C16.0181 21.7945 16.181 21.4013 16.181 20.9913H2.26849V2.44134Z" fill="white" />
                  <path d="M18.6231 11.1595C18.4752 11.0329 18.285 10.9667 18.0905 10.9742C17.896 10.9817 17.7114 11.0624 17.5738 11.2C17.4361 11.3377 17.3555 11.5222 17.348 11.7167C17.3405 11.9112 17.4066 12.1014 17.5333 12.2493L20.1457 14.8076H8.93844C8.73345 14.8076 8.53686 14.8891 8.39191 15.034C8.24696 15.179 8.16553 15.3756 8.16553 15.5806C8.16553 15.7855 8.24696 15.9821 8.39191 16.1271C8.53686 16.272 8.73345 16.3535 8.93844 16.3535H20.1457L17.5333 19.0278C17.4523 19.097 17.3866 19.1823 17.3402 19.2782C17.2939 19.3741 17.2678 19.4785 17.2637 19.585C17.2596 19.6914 17.2775 19.7976 17.3164 19.8968C17.3552 19.996 17.4142 20.086 17.4895 20.1614C17.5648 20.2367 17.6549 20.2956 17.7541 20.3345C17.8532 20.3733 17.9594 20.3913 18.0658 20.3872C18.1723 20.383 18.2767 20.357 18.3726 20.3106C18.4685 20.2642 18.5538 20.1985 18.6231 20.1176L23.1369 15.6347L18.6231 11.1595Z" fill="white" />
                </svg>
                <span>Logout</span>
              </div>

            </li>
          </ul>
        </div>
      </div>
      <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setShowDeleteModal} handleDelete={handleLogout} loading={false} text={"Are you sure ?"} setShowDeleteModal={setShowDeleteModal} />
    </div>
  )
}

export default Sidebar