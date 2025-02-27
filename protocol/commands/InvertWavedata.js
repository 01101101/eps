import * as reader from '../reader.js';
import * as writer from '../writer.js';

const InvertWavedata = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset),
 ]};
};

InvertWavedata.code = 0x35;

InvertWavedata.fromBytes = (bytes) => {
  return InvertWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20());
};

export { InvertWavedata };
