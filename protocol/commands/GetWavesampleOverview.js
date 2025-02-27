import * as reader from '../reader.js';
import * as writer from '../writer.js';

const GetWavesampleOverview = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset),
 ]};
};

GetWavesampleOverview.code = 0x10;

GetWavesampleOverview.fromBytes = (bytes) => {
  return GetWavesampleOverview(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20());
};

export { GetWavesampleOverview };
