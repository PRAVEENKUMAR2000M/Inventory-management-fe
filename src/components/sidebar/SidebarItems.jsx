import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const activeSublink = ({isActive}) => (isActive ? "active" : "rest")
const activeLink = ({ isActive }) => (isActive ? "active" : "rest")

function SidebarItems({ item, isOpen }) {
  const [expandMenu, setExpandMenu] = useState(false)
  
  
  if (item.childrens)
    /* if item contains sub item */
    return (
      <div className={expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"}>
        {/* each subtitle */}
        <div className="sidebar-title">
             {/* icon and titile from sidebar data */}
          <span>
            {item.icon && <div className='icon'>{item.icon}</div>}   
            {isOpen && <div>{item.title}</div>}                      
          </span>
            {/* arrrow > */}
          <MdKeyboardArrowRight size={25}                             /* arrow */
            className='arrow-icon'
            onClick={() => { setExpandMenu(!expandMenu)}}/>
        </div>
        {/* end of subtitle */}

        {/* sub heading with page link in each titile  */}        
        <div className='sidebar-content'>
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className='s-child'>
                <NavLink to={child.path}
                  className={activeSublink}>
                  <div className='sidebar-item'>
                    <div className="sidebar-title">
                      {child.icon && <div className='icon'>{child.icon}</div>}
                      {isOpen && <div>{child.title}</div>}
                  </div>
                  </div>
                  </NavLink>
              </div> 
            )
          })}
        </div>
        {/* end - sub heading with page link in each titile  */}   
        
      </div>
    )
  
  else
    /* if no sub item */
    return (
      <NavLink to={item.path}
                  className={activeLink}>
                  <div className='sidebar-item s-parent'>
          <div className="sidebar-title">
            <span>
            {item.icon && <div className='icon'>{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
                  </div>
                  </div>
                  </NavLink>
    )
  
}

export default SidebarItems