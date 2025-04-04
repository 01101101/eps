import * as reader from '../reader.js';
import * as writer from '../writer.js';

const PutWavesampleOverview = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset),
 ]};
};

PutWavesampleOverview.code = 0x19;

PutWavesampleOverview.fromBytes = (bytes) => {
  return PutWavesampleOverview(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20());
};

export { PutWavesampleOverview };
