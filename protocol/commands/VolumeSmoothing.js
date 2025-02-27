import * as reader from '../reader.js';
import * as writer from '../writer.js';

const VolumeSmoothing = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, scaleRampDepth, smoothness) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, scaleRampDepth, smoothness, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset), 
    writer.word12(scaleRampDepth), 
    writer.word12(smoothness),
 ]};
};

VolumeSmoothing.code = 0x47;

VolumeSmoothing.fromBytes = (bytes) => {
  return VolumeSmoothing(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20(), reader.word12(), reader.word12());
};

export { VolumeSmoothing };
