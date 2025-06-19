import logo from "../../assets/logo.png";
import "../../STYLES/Footer.css"
const Footer = () => {
    return (
      <footer style={{ backgroundColor: "var(--primary-color)", color: "black", padding: "30px 0", marginTop: "0%" }}>
        <div className="container text-center">
          <div className="row">
            {/* Logo & Description */}
            <div className="col-md-4">
              <img className="img" src={logo} alt="image"/>
              <h3>SkillSync</h3>
              <p>Empowering learners with 1-on-1 mentorship.</p>
            </div>
  
            {/* Quick Links */}
            <div className="col-md-4 rowww">
              <h5>Quick Links</h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><a href="#" style={{ color: "var(--text-color)", textDecoration: "none" }}>Find a Mentor</a></li>
                <li><a href="#" style={{ color: "var(--text-color)", textDecoration: "none" }}>About Us</a></li>
                <li><a href="#" style={{ color: "var(--text-color)", textDecoration: "none" }}>Contact</a></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div className="col-md-4 roww">
              <h5>Follow Us</h5>
              <div>
                <i className="bi bi-facebook mx-2"></i>
                <i className="bi bi-twitter mx-2"></i>
                <i className="bi bi-instagram mx-2"></i>
                <i className="bi bi-linkedin mx-2"></i>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-4 rowi">
            <p>&copy; {new Date().getFullYear()} SkillSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  