import React, {
  useState,
  useEffect,
  Component,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./videoplayer.css";
import YouTube from "react-youtube";
import Navbar from "../../components/navbar/Navbar";
import { useSpeechSynthesis } from "react-speech-kit";

//https://www.youtube.com/watch?v=sOVxkPvAHjI

const VideoPlayer = forwardRef((props, ref) => {
  const [initialData, setInitialData] = useState({ link: [""], words: [""] });
  const [videoNum, setVideoNum] = useState(0);
  const [spokeFirstWord, setSpokeFirstWord] = useState(false);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    fetch("/api/getText")
      .then((response) => response.json())
      .then((data) => setInitialData(data));
  }, []);

  // const getData = () => {
  //   // setTimeout(() => {
  //   fetch("/api/getText")
  //     .then((response) => response.json())
  //     .then((data) => setInitialData(data));
  //   // }, 2000);
  // };

  const nextVideo = () => {
    if (videoNum < initialData.link.length - 1) {
      setVideoNum(videoNum + 1);
      // speak({
      //   text: initialData.words[videoNum + 1],
      // });
    } else {
      setTimeout(() => {
        setVideoNum(0);
        // speak({
        //   text: initialData.words[videoNum],
        // });
      }, 1000);
    }
  };

  const chooseVid = () => {
    if (initialData.link[videoNum].indexOf("youtube") !== -1) {
      var embedStart = initialData.link[videoNum].indexOf("embed");
      var videoID = initialData.link[videoNum].substring(
        embedStart + 6,
        embedStart + 17
      );

      function changeVid(event) {
        if (event.data === 0) {
          nextVideo();
        }
      }

      const opts = {
        height: "300",
        width: "500",
        playerVars: {
          autoplay: 1,
          loop: 0,
          mute: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          autohide: 1,
          showinfo: 0,
          mode: "transparent",
        },
      };
      return (
        <div className="youtubeVideoDiv">
          <YouTube
            className="youtubeVideo"
            videoId={videoID}
            opts={opts}
            onStateChange={changeVid}
            onPlay={() =>
              speak({
                text: initialData.words[videoNum],
              })
            }
          ></YouTube>
        </div>
      );
    } else if (initialData.link[videoNum] === "unavailable") {
      setTimeout(() => {
        nextVideo();
      }, 2000);
      return (
        <div className="unavaiableDiv">
          <h2 className="unvailableText">Translation Unavailable</h2>
        </div>
      );
    }
    return (
      <video
        id="aslVideo"
        className="videos"
        width="700"
        autoPlay
        muted
        src={initialData.link[videoNum]}
        type="video/mp4"
        onEnded={() => nextVideo()}
        onPlaying={() =>
          speak({
            text: initialData.words[videoNum],
          })
        }
      ></video>
    );
  };

  const navigateBack = () => {
    window.location.href = "/translate-to-asl";
  };

  const speakFirstTime = () => {
    speak({
      text: initialData.words[0],
    });
  };

  return (
    <div className="pageVideoPlayerContainer">
      <Navbar />
      <div className="VideoPlayer">
        <img src="assets/landing-background.jpg" className="backgroundImage" />
        <h2 className="welcome">
          English to American Sign Language Translator
        </h2>
        <h1 className="eng-asl-text">{initialData.words.join(" ")}</h1>
        <div className="player" onLoad={speakFirstTime}>
          {chooseVid()}
        </div>
        <h1 className="currentWord">{initialData.words[videoNum]}</h1>
        <button className="backButton" onClick={navigateBack}>
          Translate something else
        </button>
      </div>
    </div>
  );
});

export default VideoPlayer;
