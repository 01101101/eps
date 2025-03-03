import * as reader from '../reader.js';
import * as writer from '../writer.js';

const ReplicateWavedata = (instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset) => {
  return { instrumentNumber, layerNumber, wavesampleNumber, dataRangeStartOffset, dataRangeEndOffset, bytes: [
    writer.word12(instrumentNumber), 
    writer.word12(layerNumber), 
    writer.word12(wavesampleNumber), 
    writer.word20(dataRangeStartOffset), 
    writer.word20(dataRangeEndOffset),
 ]};
};

ReplicateWavedata.code = 0x37;

ReplicateWavedata.fromBytes = (bytes) => {
  return ReplicateWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20());
};

export { ReplicateWavedata };
