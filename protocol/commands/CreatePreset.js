import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CreatePreset = (instrumentNumber, layerNumber, wavesampleNumber, presetNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, presetNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word12(presetNumber),
 ]};
};

CreatePreset.code = 0x68;

CreatePreset.fromBytes = (bytes) => {
  return CreatePreset(reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { CreatePreset };
