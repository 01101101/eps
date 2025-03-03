import * as reader from '../reader.js';
import * as writer from '../writer.js';

const NormalizeGain = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

NormalizeGain.code = 0x65;

NormalizeGain.fromBytes = (bytes) => {
  return NormalizeGain(reader.word12(), reader.word12(), reader.word12());
};

export { NormalizeGain };
