import * as reader from '../reader.js';
import * as writer from '../writer.js';

const GetWavesampleParameters = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

GetWavesampleParameters.code = 0x05;

GetWavesampleParameters.fromBytes = (bytes) => {
  return GetWavesampleParameters(reader.word12(), reader.word12(), reader.word12());
};

export { GetWavesampleParameters };
