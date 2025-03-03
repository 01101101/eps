import * as reader from '../reader.js';
import * as writer from '../writer.js';

const DeleteLayer = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

DeleteLayer.code = 0x23;

DeleteLayer.fromBytes = (bytes) => {
  return DeleteLayer(reader.word12(), reader.word12(), reader.word12());
};

export { DeleteLayer };
