import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Webcam from "react-webcam";
import "../TranslateToEnglish/translateToEnglish.css";
import { useSpeechSynthesis } from "react-speech-kit";

const TranslateToEnglish = (props) => {
  const [recordingText, setRecordingText] = useState("Start");
  const [predictedWord, setPredictedWord] = useState("");
  const { speak } = useSpeechSynthesis();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const sendData = (message) => {
    fetch("/api/sendImage", {
      method: "POST",
      body: JSON.stringify({
        image_data: message.image_data,
        save: message.save,
      }),
    })
      .then((response) => response.json())
      .then((message) => {
        setPredictedWord(message.word);
        speak({
          text: message.word,
        });
      });
  };

  const capture = React.useCallback(() => {
    var imageSrc = webcamRef.current.getScreenshot();
    let imageData = {
      image_data: imageSrc,
      save: "True",
    };
    sendData(imageData);
  }, [webcamRef]);

  const submitHandler = (event) => {
    if (recordingText === "Start") {
      setRecordingText("Stop");
      speak({
        text: "Sending data",
      });
      window.interval = setInterval(capture, 40);
    } else {
      setRecordingText("Start");
      speak({
        text: "Predicting",
      });
      clearInterval(window.interval);
      let endData = {
        image_data: "",
        save: "False",
      };
      sendData(endData);
    }
  };

  return (
    <div className="translatetoEngContainer">
      <Navbar />
      <div className="innerContents">
        <img src="assets/landing-background.jpg" className="backgroundImage" />

        <h2 className="welcomeEng">Welcome to Signslate</h2>
        <h1 className="asl-eng-text">
          American Sign Language to English Translator
        </h1>
        <div className="cameraTranslationDiv">
          <div className="cameraDiv">
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
              className="webcam"
            />
          </div>
          <textarea
            id="textarea"
            className={`translationTextArea-${recordingText === "Start"}`}
            value={
              recordingText === "Start" ? predictedWord : "Sending Data..."
            }
            disabled
          ></textarea>
        </div>
        <button
          className={`clickRecorder-${recordingText === "Start"}`}
          type="submit"
          onClick={submitHandler}
        >
          {recordingText} Recording
        </button>
      </div>
    </div>
  );
};

export default TranslateToEnglish;
