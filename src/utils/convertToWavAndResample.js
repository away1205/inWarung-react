export const convertToWavAndResample = (audioBlob, targetSampleRate) => {
  return new Promise((resolve) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const arrayBuffer = fileReader.result;
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.duration * targetSampleRate,
        targetSampleRate
      );
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start(0);
      const renderedBuffer = await offlineContext.startRendering();
      const wavBlob = bufferToWavBlob(renderedBuffer);
      resolve(wavBlob);
    };
    fileReader.readAsArrayBuffer(audioBlob);
  });
};

const bufferToWavBlob = (buffer) => {
  const numOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const numOfSamples = buffer.length;

  const result = new Uint8Array(44 + numOfSamples * numOfChannels * 2);
  const view = new DataView(result.buffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* file length */
  view.setUint32(4, 36 + numOfSamples * numOfChannels * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, format, true);
  /* channel count */
  view.setUint16(22, numOfChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * numOfChannels * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, numOfChannels * 2, true);
  /* bits per sample */
  view.setUint16(34, bitDepth, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, numOfSamples * numOfChannels * 2, true);

  let offset = 44;
  for (let i = 0; i < numOfSamples; i++) {
    for (let channel = 0; channel < numOfChannels; channel++) {
      const sample = buffer.getChannelData(channel)[i] * 32767;
      view.setInt16(offset, sample, true);
      offset += 2;
    }
  }

  return new Blob([result], { type: 'audio/wav' });
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};
