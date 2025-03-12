import React from "react"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import "../styles/newsletter.css"

export default function Newsletter() {

  return (

    <div className="newsletter-container">

        <div className="newsletter">

            <img src="img/footer/01.jpg" alt="Join Our Community" className="newsletter-image"/>

            <div className="newsletter-text">

                <h2>Join Our Community</h2>
                <p>Sign up & get 10% off your first books.</p>

                <div className="newsletter-input">

                    <input type="email" placeholder="your email" />
                    <button>Subscribe</button>

                </div>

                <div className="newsletter-icons">
                    <FaFacebookF className="icon" />
                    <FaTwitter className="icon" />
                    <FaInstagram className="icon" />
                    <FaLinkedinIn className="icon" />
                    <FaYoutube className="icon" />
                </div>

            </div>

        </div>

    </div>

  )

}
