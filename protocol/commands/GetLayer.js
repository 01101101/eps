import * as reader from '../reader.js';
import * as writer from '../writer.js';

const GetLayer = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

GetLayer.code = 0x04;

GetLayer.fromBytes = (bytes) => {
  return GetLayer(reader.word12(), reader.word12(), reader.word12());
};

export { GetLayer };
