import * as reader from '../reader.js';
import * as writer from '../writer.js';

const EnsembleCrossFadeLoop = (instrumentNumber, layerNumber, wavesampleNumber, scaleRampDepth) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, scaleRampDepth, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word12(scaleRampDepth),
 ]};
};

EnsembleCrossFadeLoop.code = 0x42;

EnsembleCrossFadeLoop.fromBytes = (bytes) => {
  return EnsembleCrossFadeLoop(reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { EnsembleCrossFadeLoop };
