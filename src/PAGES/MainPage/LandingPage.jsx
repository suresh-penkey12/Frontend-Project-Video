import React from "react";
import Part1 from "./Body/Part1";
import Part2 from "./Body/Part2";
import Header from "./Header/header";
const LandingPage = () => {
  return (
    <div style={{backgroundColor:"var(--background-color)"}}>
      <Part1 />
      <Part2 />
    </div>
  );
};

export default LandingPage;
