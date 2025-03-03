import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CreateLayer = (instrumentNumber, newLayerNumber, wavesampleNumber) => {
  return { instrumentNumber, newLayerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(newLayerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

CreateLayer.code = 0x22;

CreateLayer.fromBytes = (bytes) => {
  return CreateLayer(reader.word12(), reader.word12(), reader.word12());
};

export { CreateLayer };
