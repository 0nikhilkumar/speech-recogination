import "regenerator-runtime/runtime";
import React, { useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import TypewriterComponent from "typewriter-effect";

const App = () => {

  const [textTocopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textTocopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  
  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React Components.
        </p>

        <h5 className="copyBtn"><TypewriterComponent options={{
          autoStart: true,
          loop: true,
          delay: 40,
          strings:[
            "Note: For Copy First Click on box then copy button"
          ],
        }}/></h5>
        

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>{isCopied ? "Copied" : "Copy"}</button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
