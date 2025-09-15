import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Upper section: 4 columns with separators */}
        <div className="footer-top">
          {/* Contact */}
          <div className="with-sep">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-company">Truckswheel</div>
            <ul className="footer-list">
              <li className="footer-row">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 3.75A2.25 2.25 0 013.75 1.5h2.068c.9 0 1.69.597 1.94 1.463l.62 2.175a2.25 2.25 0 01-.585 2.217l-1.1 1.1a15.751 15.751 0 007.822 7.822l1.1-1.1a2.25 2.25 0 012.217-.585l2.175.62a2.062 2.062 0 011.463 1.94v2.068a2.25 2.25 0 01-2.25 2.25h-.75C8.708 21.99 2.01 15.292 2 6.75v-.75a2.25 2.25 0 01-.5-1.5z"/></svg>
                <a className="footer-text-link" href="tel:+923001234567">+92 300 1234567</a>
              </li>
              <li className="footer-row">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0L12 12.75 2.25 6.75"/></svg>
                <a className="footer-text-link" href="mailto:info@truckswheel.c">info@truckswheel.c</a>
              </li>
              <li className="footer-row">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25c-4.28 0-7.75 3.47-7.75 7.75 0 5.813 6.773 11.116 7.061 11.337.41.311.968.311 1.378 0 .288-.221 7.061-5.524 7.061-11.337 0-4.28-3.47-7.75-7.75-7.75zm0 10.25a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
                <a className="footer-text-link" href="https://maps.google.com/?q=Lahore,+Pakistan" target="_blank" rel="noreferrer">Lahore, Pakistan</a>
              </li>
              <li className="footer-row">
                <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.95C.16 5.281 5.443 0 12.081 0c3.181 0 6.167 1.24 8.413 3.488a11.82 11.82 0 013.505 8.396c-.003 6.637-5.286 11.92-11.924 11.92a11.9 11.9 0 01-5.946-1.594L.057 24z"/></svg>
                <a className="footer-text-link" href="https://wa.me/923001234567" target="_blank" rel="noreferrer">WhatsApp</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="with-sep">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              <li><a className="footer-link" href="#">Home</a></li>
              <li><a className="footer-link" href="#">Listings</a></li>
              <li><a className="footer-link" href="#">Buy a Vehicle</a></li>
              <li><a className="footer-link" href="#">Sell a Vehicle</a></li>
              <li><a className="footer-link" href="#">News / Blog</a></li>
              <li><a className="footer-link" href="#">About Us</a></li>
              <li><a className="footer-link" href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Important Policies */}
          <div className="with-sep">
            <h3 className="footer-title">Important Policies</h3>
            <ul className="footer-list">
              <li><a className="footer-link" href="#">Privacy Policy</a></li>
              <li><a className="footer-link" href="#">Terms &amp; Conditions</a></li>
              <li><a className="footer-link" href="#">Refund / Return Policy</a></li>
              <li><a className="footer-link" href="#">Disclaimer</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer-title">Newsletter Signup</h3>
            <div className="news-box">
              <label className="footer-text" htmlFor="newsletter-email">Enter your email</label>
              <input id="newsletter-email" type="email" placeholder="Enter your email" className="news-input" />
              <button type="button" className="news-btn">Subscribe</button>
              <p className="news-note">Subscribe to get updates on new vehicles and offers</p>
            </div>
          </div>
        </div>

        {/* Lower section */}
        <div className="footer-bottom">
          <div className="stack">
            <div className="socials">
              {/* Simple social icons */}
              <a aria-label="Facebook" href="#" className="footer-text-link">Facebook</a>
              <a aria-label="Instagram" href="#" className="footer-text-link">Instagram</a>
              <a aria-label="YouTube" href="#" className="footer-text-link">YouTube</a>
              <a aria-label="LinkedIn" href="#" className="footer-text-link">LinkedIn</a>
            </div>
            <div className="payments">
              <span className="badge">VISA</span>
              <span className="badge">Easypaisa</span>
              <span className="badge">JazzCash</span>
              <span className="badge">Bank Transfer</span>
            </div>
            <p className="copyright">© 2025 Truckswheel. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
