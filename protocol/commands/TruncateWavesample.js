import * as reader from '../reader.js';
import * as writer from '../writer.js';

const TruncateWavesample = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

TruncateWavesample.code = 0x30;

TruncateWavesample.fromBytes = (bytes) => {
  return TruncateWavesample(reader.word12(), reader.word12(), reader.word12());
};

export { TruncateWavesample };
