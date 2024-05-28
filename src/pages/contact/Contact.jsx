import React, { useState } from 'react'
import './contact.css'
import { Card } from 'react-bootstrap'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaEnvelope } from 'react-icons/fa6'
import { GoLocation } from "react-icons/go";
import { IoLogoLinkedin } from "react-icons/io";
import { toast } from 'react-toastify'
import axios from 'axios'
import { BE_URL } from "../../services/authService"


const Contact = () => {

  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const data = { subject, message }

  const sendEmail = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BE_URL}/api/contactus`, data)
      setSubject("")
      setMessage("")
      toast.success(response.data.message)
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='contact'>
      <h3 className="--mt">Contact Us</h3>
      <div className='section'>
       {/*  form section */}
        <form name="contactus" onSubmit={sendEmail}>
          <Card className="card">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder='Subject Here..'
              required
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
            />

            <label htmlFor="messsage">Message</label>
            <textarea
              cols="30"
              rows="10"
              type="text"
              name="message"
              placeholder='Message Here..'
              required
              value={message}
              onChange={(e) => { setMessage(e.target.value) }}
            ></textarea>

            <button className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>
        {/*  form section */}
        <div className="details">
          <Card className='card2'>
            <h3>Our Contact Information</h3>
            <p>Fill in the form or contact us via other chaannels lited below</p>
            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>123456789</p>
              </span>
              <span>
                <FaEnvelope />
                <p>rnagapriyanka@gmail.com</p>
              </span>
              <span>
                <GoLocation />
                <p>TamilNadu, India</p>
              </span>
              <span>
                <IoLogoLinkedin />
                <p>Nagappriyankar</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contact