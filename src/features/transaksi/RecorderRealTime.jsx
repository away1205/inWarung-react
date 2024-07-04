import { useState, useEffect, useRef } from 'react';
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  CancellationReason,
  ResultReason,
} from 'microsoft-cognitiveservices-speech-sdk';

const RecorderRealTime = () => {
  const [transcription, setTranscription] = useState('');
  const recognizerRef = useRef(null);

  useEffect(() => {
    const subscriptionKey = 'ace0d72666fc4b7f8b140906416ae451';
    const serviceRegion = 'southeastasia';

    const speechConfig = SpeechConfig.fromSubscription(
      subscriptionKey,
      serviceRegion
    );
    speechConfig.speechRecognitionLanguage = 'id-ID';

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current.recognized = (sender, event) => {
      if (event.result.reason === ResultReason.RecognizedSpeech) {
        setTranscription((prev) => prev + ' ' + event.result.text);
      }
    };

    recognizerRef.current.recognizing = (sender, event) => {
      console.log(`RECOGNIZING: Text=${event.result.text}`);
    };

    recognizerRef.current.canceled = (sender, event) => {
      console.error(`CANCELED: Reason=${event.reason}`);
      if (event.reason === CancellationReason.Error) {
        console.error(`ErrorDetails=${event.errorDetails}`);
      }
      recognizerRef.current.stopContinuousRecognitionAsync();
    };

    recognizerRef.current.sessionStopped = (sender, event) => {
      console.log('Session stopped.');
      recognizerRef.current.stopContinuousRecognitionAsync();
    };

    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.close();
      }
    };
  }, []);

  const startRecognition = () => {
    if (recognizerRef.current) {
      recognizerRef.current.startContinuousRecognitionAsync();
    }
  };

  const stopRecognition = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync();
    }
  };

  return (
    <div>
      <button onClick={startRecognition}>Start Recognition</button>
      <button onClick={stopRecognition}>Stop Recognition</button>

      <div>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export { RecorderRealTime };
