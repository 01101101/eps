import * as reader from '../reader.js';
import * as writer from '../writer.js';

const SynthesizedLoop = (instrumentNumber, layerNumber, wavesampleNumber, smoothness) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, smoothness, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word12(smoothness),
 ]};
};

SynthesizedLoop.code = 0x66;

SynthesizedLoop.fromBytes = (bytes) => {
  return SynthesizedLoop(reader.word12(), reader.word12(), reader.word12(), reader.word12());
};

export { SynthesizedLoop };
