import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Sidebar from '../sidebar/Sidebar'


function Layout({children}) {
  return (
      <>  
          
          <Header />
          <div style={{ minHeight: "80vh" }} className="--pad">
              {children}
          </div>
        <Footer />
      </>
      
  )
}

export default Layout