import * as reader from '../reader.js';
import * as writer from '../writer.js';

const PutPitchTable = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

PutPitchTable.code = 0x16;

PutPitchTable.fromBytes = (bytes) => {
  return PutPitchTable(reader.word12(), reader.word12(), reader.word12());
};

export { PutPitchTable };
