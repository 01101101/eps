import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CreateInstrument = (newInstrumentNumber, layerNumber, wavesampleNumber) => {
  return { newInstrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(newInstrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

CreateInstrument.code = 0x21;

CreateInstrument.fromBytes = (bytes) => {
  return CreateInstrument(reader.word12(), reader.word12(), reader.word12());
};

export { CreateInstrument };
