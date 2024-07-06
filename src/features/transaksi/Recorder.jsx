import { useState, useRef } from 'react';
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

import { IconMicrophone, IconRectangleFilled } from '@tabler/icons-react';
import Button from 'react-bootstrap/esm/Button';
import { convertToWavAndResample } from '../../utils/convertToWavAndResample';
import harvardAudio from '../../../public/harvard.wav';

const subscriptionKey = 'ace0d72666fc4b7f8b140906416ae451';
const serviceRegion = 'southeastasia';

const AudioRecorder = ({ onListBarang, onTranscription }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isInputHidden, setIsInputHidden] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const intervalRef = useRef(null);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  console.log(isInputHidden);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    transcribeAudio(file);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, {
        type: 'audio/wav; codecs=opus',
      });
      const wavBlob = await convertToWavAndResample(audioBlob, 16000);
      const audioFile = new File([wavBlob], 'recorded_audio.wav', {
        type: 'audio/wav',
      });

      setAudioURL(URL.createObjectURL(wavBlob));
      // const dataTransfer = new DataTransfer();
      // dataTransfer.items.add(audioFile);
      // fileInput.current.files = dataTransfer.files;

      // Prepare FormData
      const formData = new FormData();
      formData.append('file', file);

      // POST request to API endpoint
      fetch('https://awa-inwarungserver-ai.azurewebsites.net/receipt', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          onListBarang((cur) => [...cur, ...data.order.details]);
          onTranscription(data.transcription);
          console.log(data);
        })
        .catch((error) => {
          console.log(`Error uploading file: ${error.message}`);
        });

      // transcribeAudio(audioBlob);
      // saveAudio(wavBlob);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
    intervalRef.current = setInterval(() => {
      setRecordingDuration((prevDuration) => prevDuration + 1);
    }, 1000);

    // transcribeAudio();
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
      // console.log(result.text);
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
      <div className=''>
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

      <div
        // style={{ display: isInputHidden ? 'none' : 'inline' }}
        className={`${
          isInputHidden ? 'd-none' : 'd-flex'
        } flex-column gap-2 mt-4`}
      >
        <input
          type='file'
          accept='.wav'
          onChange={handleFileChange}
          ref={fileInput}
        />
        <Button
          variant={'outline-secondary'}
          onClick={() => setIsInputHidden((cur) => !cur)}
        >
          Hide Input
        </Button>
      </div>
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
