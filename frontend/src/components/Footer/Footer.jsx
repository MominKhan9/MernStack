import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. In vero sed aliquam aperiam aliquid, eveniet placeat. Ullam deserunt vero sint, optio libero ratione exercitationem quam rerum. Illo maxime sapiente fugiat.</p>
            <div className="footer-social-icons">
                <img src={ assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <a href="/"><li>Home</li></a> 
                 <a href="#app-download"><li>Mobile App</li></a>
                <a href="#explore-menu"><li>Our Menu</li></a>
                <a href=""><li>Privicy Policy</li></a>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+123 456 789</li>
                <li>email@email.com </li>
            </ul>
        </div>
      </div>
      <hr /> 
      <p className='footer-copyright'>
        Copyright © 2022 | All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
