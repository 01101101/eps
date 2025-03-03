import * as reader from '../reader.js';
import * as writer from '../writer.js';

const LengthenLoop = (instrumentNumber, layerNumber, wavesampleNumber, fadeZoneSize, scaleRampDepth) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, fadeZoneSize, scaleRampDepth, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(fadeZoneSize), 
    writer.word12(scaleRampDepth),
 ]};
};

LengthenLoop.code = 0x44;

LengthenLoop.fromBytes = (bytes) => {
  return LengthenLoop(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word12());
};

export { LengthenLoop };
