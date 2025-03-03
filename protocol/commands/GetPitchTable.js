import * as reader from '../reader.js';
import * as writer from '../writer.js';

const GetPitchTable = (instrumentNumber, layerNumber, wavesampleNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber),
 ]};
};

GetPitchTable.code = 0x07;

GetPitchTable.fromBytes = (bytes) => {
  return GetPitchTable(reader.word12(), reader.word12(), reader.word12());
};

export { GetPitchTable };
