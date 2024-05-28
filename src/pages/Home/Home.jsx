import React from 'react'
import { DiYii } from "react-icons/di";
import { Link } from 'react-router-dom';
import "./Home.css"
import invImg from '../../assets/invpng.png'
import {ShowOnLogin} from '../../components/protect/HiddenLinks'
import {ShowOnLogout} from '../../components/protect/HiddenLinks'



function Home() {
  return (
    /* nav section */
    <div className="home bg-primary">
      <nav className="container --flex-between">
        <div className="logo">
          <DiYii size={35} />
          <Link to="/">Inventory Management Tool</Link>
        </div>
        <ul className="home-links">
          <ShowOnLogout>
          <li>
            <Link to="/register">Register</Link>
          </li>
          </ShowOnLogout>
          <ShowOnLogout>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>
        </ShowOnLogout>
      <ShowOnLogin>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
      </li>
        </ShowOnLogin>
        </ul>
      </nav>
      {/* body section */}

      <section className="container bodyC">
        <div className="body-text">
          <h2>Inventory Management System</h2>
          <p>An inventory management system (or inventory system) is the process by which you track your goods throughout your entire supply chain, from purchasing to production to end sales. It governs how you approach inventory management for your business.</p>
        </div>
        <div className="body-image">
          <img src={invImg} alt="inventory" />
        </div>
      </section>

    </div>

  )
}

export default Home