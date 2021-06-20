import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "../Main/main.css";

const MainPage = () => {
  return (
    <div className="Main">
      <Navbar />
      <div className="innerContents">
        <img src="assets/landing-background.jpg" className="backgroundImage" />
        <h1 className="landingTitle">Welcome to Signslate</h1>
        <div className="sections">
          <div className="sectionContainer">
            <p className="sectionTitle">What is Signslate?</p>
            <p className="sectionBody">
              Signslate is translator website dedicated to educating the world
              on the rich language of American Sign Language. You can use the
              website to learn how to say any word in sign language. Signslate
              was created with the intention to spread awareness of people with
              hearing or speaking disabilities. Not everyone was born with the
              same priviledges but you can do your part by learning sign
              language and allow those with disabilities to feel more included
              in society!
            </p>
          </div>

          <div className="sectionContainer">
            <p className="sectionTitle">Why American Sign Language?</p>
            <p className="sectionBody">
              American Sign Language (ASL) is a visual gestural language created
              by those with speaking and hearing disabilities. The language has
              approximately 500,000 speakers around the world! Despite being
              able to communicate, ASL speakers struggle to feel included in
              society due to their differences. Not many people may understand
              how to communicate in the language. Learning ASL could help reduce
              the struggle those with disabilities face!
            </p>
          </div>

          <div className="sectionContainer">
            <p className="sectionTitle">How to Use Signslate</p>
            <p className="sectionBody">
              Signslate is extremely easy-to-use! To use the English to ASL
              Translator, simply click the appropriate link in the navigation
              bar to be redireted to the translator. Entering the English text
              be can done by either entering manually or using your microphone
              to voice type. Be sure to stop recording before you hit the
              translate button. After learning a handful of words on the English
              to ASL translator, you can use to ASL to English translator to
              test your sign language skills!
            </p>
          </div>
        </div>
        <p style={{ margin: 0 }}>
          This project was created for High Tech Hacks 2021
        </p>
      </div>
    </div>
  );
};

export default MainPage;
