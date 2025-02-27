import * as reader from '../reader.js';
import * as writer from '../writer.js';

const CopyWavedata = (sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, sourceDataRangeStartOffset, sourceDataRangeEndOffset, destinationDataRangeStartOffset) => {
  return { sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, sourceDataRangeStartOffset, sourceDataRangeEndOffset, destinationDataRangeStartOffset, bytes: [
    writer.word12(sourceInstrumentNumber), 
    writer.word12(sourceLayerNumber), 
    writer.word12(sourceWavesampleNumber), 
    writer.word12(destinationInstrumentNumber), 
    writer.word12(destinationLayerNumber), 
    writer.word12(destinationWavesampleNumber), 
    writer.word20(sourceDataRangeStartOffset), 
    writer.word20(sourceDataRangeEndOffset), 
    writer.word20(destinationDataRangeStartOffset),
 ]};
};

CopyWavedata.code = 0x32;

CopyWavedata.fromBytes = (bytes) => {
  return CopyWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20(), reader.word20());
};

export { CopyWavedata };
