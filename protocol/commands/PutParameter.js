import * as reader from '../reader.js';
import * as writer from '../writer.js';

const PutParameter = (instrumentNumber, layerNumber, wavesampleNumber, parameterNumber, parameterValue) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, parameterNumber, parameterValue, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word12(parameterNumber), 
    writer.word24(parameterValue),
 ]};
};

PutParameter.code = 0x17;

PutParameter.fromBytes = (bytes) => {
  return PutParameter(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word24());
};

export { PutParameter };
