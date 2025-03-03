import * as reader from '../reader.js';
import * as writer from '../writer.js';

const PutInstrument = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

PutInstrument.code = 0x12;

PutInstrument.fromBytes = (bytes) => {
  return PutInstrument(reader.word12(), reader.word12(), reader.word12());
};

export { PutInstrument };
