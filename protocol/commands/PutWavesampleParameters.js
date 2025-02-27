import * as reader from '../reader.js';
import * as writer from '../writer.js';

const PutWavesampleParameters = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

PutWavesampleParameters.code = 0x14;

PutWavesampleParameters.fromBytes = (bytes) => {
  return PutWavesampleParameters(reader.word12(), reader.word12(), reader.word12());
};

export { PutWavesampleParameters };
