import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "../videoplayer/VideoPlayer";
import "../TranslateToASL/translateToASL.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Navbar from "../../components/navbar/Navbar";
import { useSpeechSynthesis } from "react-speech-kit";

const TranslateToASL = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const childRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [enteredText, setEnteredText] = useState("");
  const [title, setTitle] = useState(
    "English to American Sign Language Translator"
  );
  const [isRecording, setIsRecording] = useState(false);
  const { speak } = useSpeechSynthesis();

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredText !== "") {
      setSubmitted(true);
      setTitle("Loading...");
      speak({
        text: "Loading",
      });
      let message = {
        text: enteredText,
      };
      saveData(message);
      setTimeout(() => {
        window.location.href = "/translate-to-asl-videos";
      }, 4000);
      setEnteredText("");
    }
  };

  const saveData = (message) => {
    fetch("/api/sendText", {
      method: "POST",
      body: JSON.stringify({
        content: message.text,
      }),
    })
      .then((response) => response.json())
      .then((message) => console.log(message));
  };

  const videoClickedHandler = (data) => {
    speak({
      text: data,
    });
  };

  const renderVideo = () => {
    if (submitted) {
      return (
        <div className={`translateVideoPlayer-${submitted}`}>
          <VideoPlayer ref={childRef} />
        </div>
      );
    }
  };

  const startRecordingAudio = () => {
    if (isRecording) {
      setEnteredText(transcript);
      SpeechRecognition.stopListening();
      setIsRecording(false);
    } else {
      SpeechRecognition.startListening();
      setIsRecording(true);
    }
  };

  const resetTextArea = () => {
    resetTranscript();
    setEnteredText("");
  };

  return (
    <div className="TranslateToASL">
      <Navbar />
      <div className="innerContents">
        <img src="assets/landing-background.jpg" className="backgroundImage" />
        <h2 className={`welcome-${submitted}`}>Welcome to Signslate</h2>
        <h1 className="titleText">{title}</h1>
        <div className={`inputDiv-${submitted}`}>
          <div className="microphoneDiv">
            <button onClick={startRecordingAudio} className="startStopBtn">
              {isRecording ? "Stop" : "Start"} Voice Typing
            </button>
            <button onClick={resetTextArea} className="resetBtn">
              Reset
            </button>
          </div>
          <form onSubmit={submitHandler}>
            <textarea
              className="englishTextArea"
              placeholder="Your English text goes here"
              value={isRecording ? transcript : enteredText}
              disabled={isRecording}
              onChange={textChangeHandler}
            ></textarea>
            <button
              className="submitButton"
              type="submit"
              // onClick={() => childRef.current.getData()}
            >
              Translate Text
            </button>
          </form>
        </div>
        {renderVideo}
      </div>
    </div>
  );
};

export default TranslateToASL;
