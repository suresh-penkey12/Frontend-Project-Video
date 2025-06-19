import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import "./STYLES/globaltheme.css"
import { Routes, useLocation } from "react-router-dom";
import LandingPage from "./PAGES/MainPage/LandingPage";
// import Filters_page from './Filters/Skills_filter'
import Full_page from "./PAGES/All_Mentors_Page/Full_page";
import { Route } from "react-router-dom";
import Profile from "./PAGES/Profile_page/Profile";
import Header from "./PAGES/MainPage/Header/header";
import Login_page from "./PAGES/Authentication_Pages/Login_page";
import Register_page from "./PAGES/Authentication_Pages/Register_page";
import Dashboard from "./PAGES/DashBoard_page/DahsBoard_mentor";
import DashBoard_nav from "./PAGES/DashBoard_page/Components/DashBoard_nav";
import Profile_page from "./PAGES/DashBoard_page/Profile_page";
import Request_page from "./PAGES/DashBoard_page/Request_page";
import Requests from "./PAGES/DashBoard_page/Components/Requests";
import Friends from "./PAGES/DashBoard_page/Components/Friends";
import LobbyScreen from "./WEBRTC/Pages/LobbyPage";
import RoomPage from "./WEBRTC/Pages/RoomPage";
import Memborships from "./PAGES/DashBoard_page/Components/memborships";
import MemborRequests from "./PAGES/DashBoard_page/Components/Membor_requests";
import Success_page from "./PAGES/Payment_pages/success_page";
import Failure_page from "./PAGES/Payment_pages/Failure_page";
import Footer from "./PAGES/MainPage/Footer";
function App() {
  const location = useLocation();
  let hidebar = (location.pathname.includes("/DashBoard"));
  return (
    <>
      {hidebar ? <DashBoard_nav/> : <Header/>}
      <Routes>
        <Route path="/" element ={<LandingPage/>}/>
        <Route path="/success" element={<Success_page/>}/>
        <Route path="/failure" element={<Failure_page/>}/>
        <Route path="/Auth/Login" element={<Login_page/>}/>
        <Route path="/DashBoard/mentors" element={<Dashboard/>}/>
        <Route path="/DashBoard/connections" element={<Request_page/>}/>
        <Route path="/DashBoard/connections/requests" element = {<Requests/>}/>
        <Route path="/DashBoard/connections/friends" element={<Friends/>}/>
        <Route path="/DashBoard/connections/membor_requests" element={<MemborRequests/>}/>
        <Route path="/DashBoard/connections/memborships" element={<Memborships/>}/>
        <Route path="/DashBoard/profile" element={<Profile_page/>}/>
        <Route path="/Auth/Register" element={<Register_page/>}/>
        <Route path="/mentor/browse" element={<Full_page />} />
        <Route path="/mentor/:query_id" element={<Profile />} />
        <Route path="/DashBoard/connections/friends/room" element={<LobbyScreen/>}/>
        <Route path="/DashBoard/connections/friends/room/:roomId" element={<RoomPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
