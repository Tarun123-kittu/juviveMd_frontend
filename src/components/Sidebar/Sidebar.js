import React from 'react'
import { useLocation } from 'react-router-dom'
import { SidebarMenuItems } from './SidebarMenu'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import UserImage from '../../Images/default_use.svg'
const Sidebar = () => {
    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");
  return (
    <div className='sidebar_wrapper'>
        <div className='header'>
            <h4 className='mb-0'>Good Morning,JuvivedMD!</h4>
            <p className='quote mb-0'>Happiness is inside, let it out!</p>
        </div>
        <div className='sidbar_inner'>
            <div className='user_info'>
                <img src={UserImage} alt="user image" />
                <h6>JuviveMD</h6>
                <p>Physiotherapy</p>
            </div>
            <ul className='menu_items d-flex flex-column'>
              {SidebarMenuItems && SidebarMenuItems.map((menus,index)=>{
                return(
                    <li key={index}>
                       <Link className={menus.path === "/" + splitLocation[1] ? "sidebar_active" : ""} to={menus.path}>{menus.icon} <span>{menus.name}</span></Link>      
                    </li>
                )
              })}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar