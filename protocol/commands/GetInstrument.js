import * as reader from '../reader.js';
import * as writer from '../writer.js';

const GetInstrument = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

GetInstrument.code = 0x03;

GetInstrument.fromBytes = (bytes) => {
  return GetInstrument(reader.word12(), reader.word12(), reader.word12());
};

export { GetInstrument };
