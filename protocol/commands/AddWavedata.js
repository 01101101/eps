import * as reader from '../reader.js';
import * as writer from '../writer.js';

const AddWavedata = (sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, sourceDataRangeStartOffset, sourceDataRangeEndOffset, destinationDataRangeStartOffset, clipPreventionFlag) => {
  return { sourceInstrumentNumber, sourceLayerNumber, sourceWavesampleNumber, destinationInstrumentNumber, destinationLayerNumber, destinationWavesampleNumber, sourceDataRangeStartOffset, sourceDataRangeEndOffset, destinationDataRangeStartOffset, clipPreventionFlag, bytes: [
    writer.word12(sourceInstrumentNumber), 
    writer.word12(sourceLayerNumber), 
    writer.word12(sourceWavesampleNumber), 
    writer.word12(destinationInstrumentNumber), 
    writer.word12(destinationLayerNumber), 
    writer.word12(destinationWavesampleNumber), 
    writer.word20(sourceDataRangeStartOffset), 
    writer.word20(sourceDataRangeEndOffset), 
    writer.word20(destinationDataRangeStartOffset), 
    writer.word12(clipPreventionFlag),
 ]};
};

AddWavedata.code = 0x33;

AddWavedata.fromBytes = (bytes) => {
  return AddWavedata(reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word12(), reader.word20(), reader.word20(), reader.word20(), reader.word12());
};

export { AddWavedata };
