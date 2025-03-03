import * as reader from '../reader.js';
import * as writer from '../writer.js';

const DeleteInstrument = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

DeleteInstrument.code = 0x28;

DeleteInstrument.fromBytes = (bytes) => {
  return DeleteInstrument(reader.word12(), reader.word12(), reader.word12());
};

export { DeleteInstrument };
