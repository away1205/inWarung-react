import { useState, useRef } from 'react';
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

import { IconMicrophone, IconRectangleFilled } from '@tabler/icons-react';
import Button from 'react-bootstrap/esm/Button';
import { convertToWavAndResample } from '../../utils/convertToWavAndResample';

const subscriptionKey = 'ace0d72666fc4b7f8b140906416ae451';
const serviceRegion = 'southeastasia';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const intervalRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    transcribeAudio(file);
    console.log(file);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioFile = new File([audioBlob], 'recorded_audio.wav', {
        type: 'audio/wav',
      });
      console.log(audioFile);

      const wavBlob = await convertToWavAndResample(audioBlob, 16000);
      setAudioURL(URL.createObjectURL(wavBlob));

      transcribeAudio(audioFile);

      // saveAudio(wavBlob);
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
    const speechConfig = SpeechConfig.fromSubscription(
      subscriptionKey,
      serviceRegion
    );
    speechConfig.speechRecognitionLanguage = 'id-ID';

    const audioConfig = AudioConfig.fromWavFileInput(audioBlob);
    // const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      console.log(result.text);
      console.log(result);
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

      <form onSubmit={handleSubmit}>
        <input type='file' accept='.wav' onChange={handleFileChange} />
        <button type='submit'>Upload and Process</button>
      </form>
    </div>
  );
};

const saveAudio = (blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'recorded_audio.wav';
  a.click();
  window.URL.revokeObjectURL(url);
};

export default AudioRecorder;
