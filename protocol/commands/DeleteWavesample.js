import * as reader from '../reader.js';
import * as writer from '../writer.js';

const DeleteWavesample = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

DeleteWavesample.code = 0x26;

DeleteWavesample.fromBytes = (bytes) => {
  return DeleteWavesample(reader.word12(), reader.word12(), reader.word12());
};

export { DeleteWavesample };
