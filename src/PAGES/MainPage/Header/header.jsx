import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.png";

import plain_logo from "../../../assets/plain_theme.png"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { FaBars, FaTimes } from "react-icons/fa";
import "./header.css";
import { ThemeContext } from "../ThemeContext";
const Header = () => {
  const [islogin, setlogin] = useState(false);
  const[value,setValue]=useState("");
  const[locator,setLocator]=useState(true);
  const[bars,setbars]=useState(false);
  const{theme,Updatetheme}=useContext(ThemeContext);
  const navRef =useRef();
  let navigate =useNavigate();
  useEffect(() => {
    let data = sessionStorage.getItem("login");
    if (data) {
      setlogin(true);
    } else {
      setlogin(false);
    }
  }, [islogin]);
  let location =useLocation();
  useEffect(()=>{
    if(location.pathname.includes("/mentor/browse")){
      setLocator(false);
    }
    else{
      setLocator(true);
    }
  },[location.pathname])
  
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      let params = new URLSearchParams();
      if (searchValue.trim()) params.set("search", searchValue);
      let query = params.toString();
      searchValue.length > 0?
        navigate(`/mentor/browse?${query}`)
        : (locator ? navigate(`/mentor/browse`):navigate("/"));
    }, 1000), // 500ms debounce time
    [navigate]
  );

  const handleSearch = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };
  const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
		setbars(!bars);
	};
  return (
    <>
      
        <header
          className="d-flex justify-content-between align-items-center p-1 header "
          
        >
          <div style={{ display: "flex", paddingLeft: "7%" }}>
            <Link to="/">
              <img src={theme ==="light"?logo : plain_logo} alt="logo" width={150} height={100} />
            </Link>
          </div>
          {locator ? <div className="input-group" style={{ width: "30vw" }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              value={value}
              onChange={handleSearch}
            />
          </div>:""}
                <button className="theme-button" style={{color:theme==="light"?"white":"black" ,backgroundColor:theme==="light"?"black":"white",borderRadius:"20px"}} onClick={Updatetheme}>
                  {theme === 'light' ? '🌙' : '🌤️'}
                </button>
            <nav ref={navRef}>
              <div style={{maxWidth:"100%",marginLeft:"-20%",className:"navbar"}}>
                <Link to="/mentor/browse">
                  <button className="btn btn-primary me-2">
                    Browse All Mentors
                  </button>
                </Link>
                {islogin ? (
                  <Link to="/DashBoard/mentors">
                    <button className="btn btn-primary me-2">DashBoard</button>
                  </Link>
                ) : (
                  <Link to="/Auth/Login">
                    <button className="btn btn-primary me-2 login">Login</button>
                  </Link>
                )}
              </div>
            </nav>
            {bars===false ?	<button
              className="nav-btn"
              onClick={showNavbar}>
              <FaBars />
            </button>: <button
                className="nav-btn nav-close-btn"
                onClick={showNavbar}>
                <FaTimes />
              </button>}
        </header>
      
    </>
  );
};

export default Header;
