import * as reader from '../reader.js';
import * as writer from '../writer.js';

const FadeOutWavedata = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, scaleRampDepth) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, scaleRampDepth, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset), 
    writer.word12(scaleRampDepth),
 ]};
};

FadeOutWavedata.code = 0x40;

FadeOutWavedata.fromBytes = (bytes) => {
  return FadeOutWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20(), reader.word12());
};

export { FadeOutWavedata };
