import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CreateWavesample = (instrumentNumber, layerNumber, newWavesampleNumber) => {
  return { instrumentNumber, layerNumber, newWavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(newWavesampleNumber),
 ]};
};

CreateWavesample.code = 0x25;

CreateWavesample.fromBytes = (bytes) => {
  return CreateWavesample(reader.word12(), reader.word12(), reader.word12());
};

export { CreateWavesample };
