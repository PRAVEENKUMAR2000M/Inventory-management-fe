import React, { useState } from 'react'
import "./Sidebar.css"
import { DiYii } from "react-icons/di"
import {HiMenuAlt3} from "react-icons/hi"
import menu from "../../data/sidebar"
import SidebarItems from './SidebarItems'
import { useNavigate } from 'react-router-dom'


function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const toggle = () => setIsOpen(!isOpen)    //sidebar expand

  const goHome = () => {navigate("/")}      //go to dashboard

  return (
    <div className="layout">
      <div className="sidebar"
        style={{ width: isOpen ? "230px" : "60px" }}>
        
       {/*  top section contains  logo and menu icon*/}
        <div className="top_section">
          <div className="logo"
            style={{ display: isOpen ? "block": "none"}}>
            <DiYii size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}/>
          </div>
          <div className="bars"
            style={{ marginLeft: isOpen ? "120px" : "0px" }}>
            <HiMenuAlt3 size={35}
              onClick={toggle}/>
          </div>
        </div>
        {/* end of top section */}

        {/* main menu items in sidebar */}
             {/* building sidebar menu item */}
        {menu.map((item, index) => {
          return <SidebarItems
            key={index}
            item={item}
            isOpen={isOpen } />
        })}
        {/* end of main menu in sidebar */}
      </div>
      
      {/* set main menu when sidebar toggles */}
      <main style={{
        paddingLeft: isOpen ? "230px" : "60px",
        transition: "all .5s"
      }}>
        {children}
      </main>
    </div>
  )
}

export default Sidebar