import React from "react";
// import "../../styles/Dashboard.css";
 // Import CSS
 import "../../../STYLES/DashBoardContext.scss"

const BodyContent = () => {
  return (
    <div className="body-content-container">
      
      <h3>Featured Sessions</h3>
      <div className="featured-grid">
        <div className="featured-card">
          <h3>Intro Call</h3>
          <p>
            If you are looking for a mentor, here is a great opportunity to
            connect.
          </p>
          <h5>Approx 30 mins</h5>
        </div>
        <div className="featured-card">
          <h3>Work Review</h3>
          <p>
            In this session, a mentor will examine the work you have done and
            provide feedback.
          </p>
          <h5>Approx 45 mins</h5>
        </div>
        <div className="featured-card">
          <h3>Interview Preparation</h3>
          <p>
            Get prepared for your upcoming interviews with expert guidance from
            experienced mentors.
          </p>
          <h5>Approx 50 mins</h5>
        </div>
      </div>
    </div>
  );
};

export default BodyContent;
