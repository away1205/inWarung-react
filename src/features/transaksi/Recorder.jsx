import { useState, useRef, useEffect } from 'react';
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { IconMicrophone, IconRectangleFilled } from '@tabler/icons-react';
import Button from 'react-bootstrap/esm/Button';

import { convertToWavAndResample } from '../../utils/convertToWavAndResample';
import continousRecognition from './ContinousRecognition';
import { formatDuration } from '../../utils/helpers';

const subscriptionKey = import.meta.env.VITE_SPEECH_KEY;
const serviceRegion = import.meta.env.VITE_SPEECH_REGION;

const AudioRecorder = ({
  onListBarang,
  onTranscription,
  transcription,
  onTransactionGPT,
}) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isInputHidden, setIsInputHidden] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const intervalRef = useRef(null);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const [recognizer, setRecognizer] = useState(null);

  useEffect(() => {
    const newRecognizer = continousRecognition(
      subscriptionKey,
      serviceRegion,
      handleRecognition
    );
    setRecognizer(newRecognizer);

    return () => {
      if (newRecognizer) {
        newRecognizer.stopContinuousRecognitionAsync(
          () => {
            console.log('Continuous Recognition Stopped');
          },
          (err) => {
            console.error(err);
          }
        );
      }
    };
  }, []);

  const handleRecognition = (text) => {
    onTranscription((prevTranscriptions) => [...prevTranscriptions, text]);
  };

  // setRecognizer(newRecognizer);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log(file);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   transcribeAudio(file);
  // };

  const startRecording = async () => {
    onTranscription('');
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
      }); // You can refer to this if you want to make a file from an audio

      setAudioURL(URL.createObjectURL(wavBlob));

      // Prepare FormData
      // const formData = new FormData();
      // formData.append('file', file);

      // // POST request to API endpoint
      // fetch('https://awa-inwarungserver-ai.azurewebsites.net/receipt', {
      //   method: 'POST',
      //   body: formData,
      // })
      //   .then((response) => {
      //     if (response.ok) {
      //       return response.json();
      //     }
      //     throw new Error('Network response was not ok.');
      //   })
      //   .then((data) => {
      //     onListBarang((cur) => [...cur, ...data.order.details]);
      //     onTranscription(data.transcription);
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.log(`Error uploading file: ${error.message}`);
      //   });

      // saveAudio(wavBlob);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
    intervalRef.current = setInterval(() => {
      setRecordingDuration((prevDuration) => prevDuration + 1);
    }, 1000);

    // transcribeAudio();
    recognizer.startContinuousRecognitionAsync(
      () => {
        console.log('Continuous Recognition Started');
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    clearInterval(intervalRef.current);
    setRecordingDuration(0);
    setRecording(false);
    audioChunks.current = [];

    recognizer.stopContinuousRecognitionAsync(
      () => {
        console.log('Continuous Recognition Stopped');
      },
      (err) => {
        console.error(err);
      }
    );

    onTransactionGPT(transcription, {
      onSuccess: (data) =>
        onListBarang((cur) => [...cur, ...data.order.details]),
    });
  };

  const transcribeAudio = async (audioBlob) => {
    const speechConfig = SpeechConfig.fromSubscription(
      subscriptionKey,
      serviceRegion
    );
    speechConfig.speechRecognitionLanguage = 'id-ID';

    // const audioConfig = AudioConfig.fromWavFileInput(audioBlob);
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      console.log(result.text);
      // console.log(result);
    });
  };

  return (
    <div className='d-grid gap-2'>
      <div>
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

      {/* <div
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
      </div> */}
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
