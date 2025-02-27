import * as reader from '../reader.js';
import * as writer from '../writer.js';

const ReverseWavedata = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset),
 ]};
};

ReverseWavedata.code = 0x36;

ReverseWavedata.fromBytes = (bytes) => {
  return ReverseWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20());
};

export { ReverseWavedata };
