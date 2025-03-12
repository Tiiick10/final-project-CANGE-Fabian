import React from "react"
import { FaBook, FaGlobe } from "react-icons/fa"
import '../styles/footer.css'

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

            <div className="footer-section">

                <FaBook className="footer-icon" />

                <div className="footer-text-group">

                    <h4>Book Information?</h4>
                    <p>Please send us an email at support@gmail.com</p>

                </div>

            </div>

            <div className="footer-section">

                <FaGlobe className="footer-icon" />

                <div className="footer-text-group">

                    <h4>Book Information?</h4>
                    <p>Please send us an email at support@gmail.com</p>

                </div>

            </div>

      </div>

      <hr />

      <div className="footer-bottom">

            <p className="footer-brand">Bookshelf</p>
            <p className="footer-text"> © 2025 All rights reserved. Made with love by 🤍 Fabian </p>

      </div>

    </footer>

  )

}
