import * as reader from '../reader.js';
import * as writer from '../writer.js';

const GetParameter = (instrumentNumber, layerNumber, wavesampleNumber, parameterNumber) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, parameterNumber, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word12(parameterNumber),
 ]};
};

GetParameter.code = 0x08;

GetParameter.fromBytes = (bytes) => {
  return GetParameter(reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { GetParameter };
