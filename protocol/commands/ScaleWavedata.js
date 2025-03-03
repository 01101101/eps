import * as reader from '../reader.js';
import * as writer from '../writer.js';

const ScaleWavedata = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, scaleFactorStartPoint, scaleFactorEndPoint, scaleRampDepth) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, scaleFactorStartPoint, scaleFactorEndPoint, scaleRampDepth, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset), 
    writer.word16(scaleFactorStartPoint), 
    writer.word16(scaleFactorEndPoint), 
    writer.word12(scaleRampDepth),
 ]};
};

ScaleWavedata.code = 0x34;

ScaleWavedata.fromBytes = (bytes) => {
  return ScaleWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20(), reader.word16(), reader.word16(), reader.word12());
};

export { ScaleWavedata };
