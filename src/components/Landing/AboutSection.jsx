import React from "react";
import UpperAbout from "./About/UpperAbout";
import BottomAbout from "./About/BottomAbout";

function AboutSection() {
  return (
    <section className="section-layout ">
      <UpperAbout />
      <BottomAbout />
    </section>
  );
}

export default AboutSection;
