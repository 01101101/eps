import * as reader from '../reader.js';
import * as writer from '../writer.js';

const ReverseCrossFadeLoop = (instrumentNumber, layerNumber, wavesampleNumber, fadeZoneSize, scaleRampDepth) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, fadeZoneSize, scaleRampDepth, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(fadeZoneSize), 
    writer.word12(scaleRampDepth),
 ]};
};

ReverseCrossFadeLoop.code = 0x41;

ReverseCrossFadeLoop.fromBytes = (bytes) => {
  return ReverseCrossFadeLoop(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word12());
};

export { ReverseCrossFadeLoop };
