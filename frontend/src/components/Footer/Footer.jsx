import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <img src={assets.logo} alt="" />
                <p>Fresh2Farm delivers fresh, farm-grown produce directly to consumers, bridging the gap between local farmers and healthier living.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
        </div>
        
        <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About US</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
        </div>

        <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>987654321</li>
                    <li>Farm2Fresh@gmail.com</li>
                </ul>
        </div>
      </div>
    
    </div>
  )
}

export default Footer
