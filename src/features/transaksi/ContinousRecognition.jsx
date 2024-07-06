import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
} from 'microsoft-cognitiveservices-speech-sdk';

const continousRecognition = (
  subscriptionKey,
  serviceRegion,
  onRecognition
) => {
  const speechConfig = SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion
  );
  speechConfig.speechRecognitionLanguage = 'id-ID';

  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognized = (s, e) => {
    if (e.result.reason === ResultReason.RecognizedSpeech) {
      console.log(`RECOGNIZED: Text=${e.result.text}`);
      if (onRecognition) {
        onRecognition(e.result.text);
      }
    } else if (e.result.reason === ResultReason.NoMatch) {
      console.log('NOMATCH: Speech could not be recognized.');
    }
  };

  // recognizer.startContinuousRecognitionAsync(
  // () => {
  //   console.log('Continuous Recognition Started');
  // },
  // (err) => {
  //   console.error(err);
  // }
  // );

  return recognizer;
};

export default continousRecognition;
