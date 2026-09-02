import React from "react";

function Footer() {
const currentYear = new Date().getFullYear();

return ( <footer className="app-footer"> <div className="footer-content"> <div className="footer-brand"> <div className="footer-logo">✓</div>

      <div>
        <h3>TaskFlow</h3>
        <p>Organize. Focus. Achieve.</p>
      </div>
    </div>

    <p className="footer-copyright">
      © {currentYear} TaskFlow · Designed & Developed by{" "}
      <span>Atyam Rohith</span> ✨
    </p>
  </div>
</footer>


);
}

export default Footer;
