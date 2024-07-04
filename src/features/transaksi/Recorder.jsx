import { useState, useRef } from 'react';
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

import { IconMicrophone, IconRectangleFilled } from '@tabler/icons-react';
import Button from 'react-bootstrap/esm/Button';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const intervalRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      setAudioURL(URL.createObjectURL(audioBlob));
      transcribeAudio(audioBlob);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
    intervalRef.current = setInterval(() => {
      setRecordingDuration((prevDuration) => prevDuration + 1);
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    clearInterval(intervalRef.current);
    setRecordingDuration(0);
    setRecording(false);
    audioChunks.current = [];
  };

  const transcribeAudio = async (audioBlob) => {
    const subscriptionKey = 'YOUR_AZURE_SUBSCRIPTION_KEY';
    const serviceRegion = 'YOUR_SERVICE_REGION';

    const speechConfig = SpeechConfig.fromSubscription(
      subscriptionKey,
      serviceRegion
    );
    const audioConfig = AudioConfig.fromWavFileInput(audioBlob);
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      console.log(result.text);
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='d-grid gap-2'>
      <div className='d-grid'>
        <audio src={audioURL} controls />
      </div>

      <div className='d-grid'>
        <Button
          onClick={recording ? stopRecording : startRecording}
          className='rounded'
          variant={recording ? 'dark' : 'danger'}
        >
          {recording ? (
            <>
              <div className='d-flex gap-2 justify-content-center'>
                <IconRectangleFilled stroke={2} />
                <span>{formatDuration(recordingDuration)}</span>
              </div>
            </>
          ) : (
            <IconMicrophone stroke={2} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default AudioRecorder;
