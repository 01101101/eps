import * as reader from '../reader.js';
import * as writer from '../writer.js';

const PutLayer = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

PutLayer.code = 0x13;

PutLayer.fromBytes = (bytes) => {
  return PutLayer(reader.word12(), reader.word12(), reader.word12());
};

export { PutLayer };
